import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { copy } from './copy.js';
import { createJob, filterJobs, loadJobs, saveJobs, statuses, totals } from './model.js';
import './styles.css';

function JobForm({t, onAdd}) {
  const [draft,setDraft] = useState({title:'',client:'',amount:''});
  const [invalid,setInvalid] = useState(false);
  function submit(event) {
    event.preventDefault();
    const job = createJob(draft, crypto.randomUUID());
    if (!job) {setInvalid(true);return;}
    onAdd(job);setDraft({title:'',client:'',amount:''});setInvalid(false);
  }
  function field(name) { return event=>setDraft(previous=>({...previous,[name]:event.target.value})); }
  return <aside className="form-panel"><p className="eyebrow">+ {t.new}</p><form onSubmit={submit}>
    <label htmlFor="title">{t.project}</label><input id="title" required maxLength={100} value={draft.title} onChange={field('title')} />
    <label htmlFor="client">{t.client}</label><input id="client" required maxLength={80} value={draft.client} onChange={field('client')} />
    <label htmlFor="amount">{t.amount}</label><input id="amount" type="number" required min="0" max="100000000" step="0.01" value={draft.amount} onChange={field('amount')} />
    {invalid && <p className="error" role="alert">{t.invalid}</p>}
    <button className="primary" type="submit">{t.add} <span aria-hidden="true">↗</span></button>
  </form><p className="fine">{t.note}</p></aside>;
}
function JobCard({job,t,money,onStatus,onDelete}) {
  const [confirm,setConfirm] = useState(false);
  return <article className="job"><div className="job-top"><span className={`badge ${job.status}`}>{t[job.status]}</span><strong>{money(job.amount)}</strong></div>
    <h3>{job.title}</h3><p className="client">{job.client}</p>
    <div className="job-actions"><label className="sr-only" htmlFor={`status-${job.id}`}>{t.status}: {job.title}</label><select id={`status-${job.id}`} value={job.status} onChange={event=>onStatus(job.id,event.target.value)}>{statuses.map(status=><option key={status} value={status}>{t[status]}</option>)}</select>
      {!confirm && <button className="quiet" type="button" onClick={()=>setConfirm(true)} aria-label={`${t.remove}: ${job.title}`}>{t.remove}</button>}</div>
    {confirm && <div className="confirmation"><p>{t.deleteQuestion}</p><button type="button" onClick={()=>onDelete(job.id)}>{t.confirm}</button><button type="button" onClick={()=>setConfirm(false)}>{t.cancel}</button></div>}
  </article>;
}
export function App() {
  const [initial] = useState(()=>{try{return loadJobs(window.localStorage);}catch{return {jobs:[],warning:true};}});
  const [jobs,setJobs] = useState(initial.jobs);
  const [warning,setWarning] = useState(initial.warning);
  const [language,setLanguage] = useState('tr');
  const [filter,setFilter] = useState('all');
  const [query,setQuery] = useState('');
  const [notice,setNotice] = useState('');
  const t = copy[language];
  useEffect(()=>{document.documentElement.lang=language;},[language]);
  const summary = totals(jobs);
  const shown = filterJobs(jobs,filter,query);
  const money = amount=>new Intl.NumberFormat(language==='tr'?'tr-TR':'en-GB',{style:'currency',currency:'TRY',maximumFractionDigits:2}).format(amount);
  function update(next,message) {setJobs(next);try{setWarning(!saveJobs(window.localStorage,next));}catch{setWarning(true);}setNotice(message);}
  return <><header><a className="logo" href="#main"><span aria-hidden="true">▦</span> freelance<span className="logo-light">desk</span></a><button type="button" className="language" aria-label={t.language} onClick={()=>setLanguage(previous=>previous==='tr'?'en':'tr')}>{language==='tr'?'EN':'TR'}</button></header>
    <main id="main"><section className="intro"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p><p className="local"><span aria-hidden="true">●</span> {t.local}</p></section>
    {warning && <p role="alert" className="warning">{t.storage}</p>}
    <section className="stats" aria-label={t.list}><div><span>{t.total}</span><strong>{summary.count}</strong></div><div><span>{t.active}</span><strong>{summary.active}</strong></div><div><span>{t.completed}</span><strong>{money(summary.completed)}</strong></div></section>
    <div className="workspace"><JobForm t={t} onAdd={job=>update([job,...jobs],'saved')}/><section className="tracker"><div className="list-heading"><h2>{t.list}</h2><span>{shown.length} {t.count}</span></div>
      <div className="toolbar"><label className="sr-only" htmlFor="search">{t.search}</label><input id="search" type="search" placeholder={t.search} value={query} onChange={event=>setQuery(event.target.value)}/><label className="sr-only" htmlFor="filter">{t.filter}</label><select id="filter" value={filter} onChange={event=>setFilter(event.target.value)}><option value="all">{t.all}</option>{statuses.map(status=><option key={status} value={status}>{t[status]}</option>)}</select></div>
      <p className="notice" role="status">{notice?t[notice]:''}</p>
      {shown.length===0?<div className="empty"><span aria-hidden="true">↗</span><h3>{jobs.length===0?t.empty:t.noMatch}</h3>{jobs.length===0&&<p>{t.emptyHelp}</p>}</div>:<div className="jobs">{shown.map(job=><JobCard key={job.id} job={job} t={t} money={money} onStatus={(id,status)=>update(jobs.map(item=>item.id===id?{...item,status}:item),'updated')} onDelete={id=>update(jobs.filter(item=>item.id!==id),'deleted')}/>)}</div>}
    </section></div></main><footer>{t.credit}</footer></>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
