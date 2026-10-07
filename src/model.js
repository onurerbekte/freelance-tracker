export const STORAGE_KEY = 'onur-freelance-desk-v1';
export const statuses = ['lead', 'progress', 'done'];
export function validJob(job) {
  return job && typeof job.id === 'string' && job.id.length > 0 &&
    typeof job.title === 'string' && job.title.trim().length > 0 && job.title.length <= 100 &&
    typeof job.client === 'string' && job.client.trim().length > 0 && job.client.length <= 80 &&
    typeof job.amount === 'number' && Number.isFinite(job.amount) && job.amount >= 0 && job.amount <= 100000000 &&
    statuses.includes(job.status);
}
export function loadJobs(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return {jobs: [], warning: false};
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(validJob) || new Set(parsed.map(job => job.id)).size !== parsed.length) throw new Error('Invalid saved data');
    return {jobs: parsed, warning: false};
  } catch { return {jobs: [], warning: true}; }
}
export function saveJobs(storage, jobs) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(jobs)); return true; } catch { return false; }
}
export function createJob(draft, id) {
  const job = {id, title:draft.title.trim(), client:draft.client.trim(), amount:Number(draft.amount), status:'lead'};
  if (draft.amount.trim() === '' || !validJob(job)) return null;
  return job;
}
export function filterJobs(jobs, status, query) {
  const search = query.trim().toLocaleLowerCase('tr');
  return jobs.filter(job => (status === 'all' || job.status === status) && `${job.title} ${job.client}`.toLocaleLowerCase('tr').includes(search));
}
export function totals(jobs) {
  return {count:jobs.length, active:jobs.filter(job=>job.status==='progress').length, completed:jobs.filter(job=>job.status==='done').reduce((sum,job)=>sum+job.amount,0)};
}
