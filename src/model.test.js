import test from 'node:test';
import assert from 'node:assert/strict';
import {createJob,filterJobs,loadJobs,saveJobs,STORAGE_KEY,totals} from './model.js';
const job = {id:'one',title:'İşletme sitesi',client:'Mola',amount:2500,status:'lead'};
test('rejects empty, negative and non-finite budgets; trims valid input',()=>{
  for(const amount of ['', '-1','Infinity','not a number','100000001']) assert.equal(createJob({title:'Site',client:'Mola',amount},'new'),null);
  assert.equal(createJob({title:'   ',client:'Mola',amount:'10'},'new'),null);
  assert.deepEqual(createJob({title:' Site ',client:' Mola ',amount:'0'},'new'),{id:'new',title:'Site',client:'Mola',amount:0,status:'lead'});
});
test('search and status combine; Turkish case folding is supported',()=>{
  const jobs=[job,{...job,id:'two',title:'Bot',status:'done'}];
  assert.equal(filterJobs(jobs,'all','işletme').length,1);
  assert.equal(filterJobs(jobs,'done','Mola').length,1);
  assert.equal(filterJobs(jobs,'lead','bot').length,0);
});
test('only completed quotes contribute to completed amount',()=>{
  assert.deepEqual(totals([job,{...job,id:'two',status:'progress'},{...job,id:'three',status:'done',amount:1250.5}]),{count:3,active:1,completed:1250.5});
});
test('storage roundtrip preserves entries and an intentionally empty list',()=>{
  const data=new Map();const storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value)};
  assert.deepEqual(loadJobs(storage),{jobs:[],warning:false});
  assert.equal(saveJobs(storage,[job]),true);assert.deepEqual(loadJobs(storage),{jobs:[job],warning:false});
  saveJobs(storage,[]);assert.deepEqual(loadJobs(storage),{jobs:[],warning:false});
});
test('malformed, duplicate and unavailable storage degrades safely',()=>{
  for(const raw of ['{bad','{}',JSON.stringify([{...job,status:'invalid'}]),JSON.stringify([job,job])]) assert.deepEqual(loadJobs({getItem:()=>raw}),{jobs:[],warning:true});
  const blocked={getItem(){throw new Error('blocked');},setItem(){throw new Error('quota');}};
  assert.equal(loadJobs(blocked).warning,true);assert.equal(saveJobs(blocked,[job]),false);
  assert.equal(typeof STORAGE_KEY,'string');
});
