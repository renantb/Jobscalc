const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {

    // todos os get desse projeto tem q usar await
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas por dia de cada Job em progresso
    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
        
      const remaining = JobUtils.remainingDays(job);
      
      // se o job esta encerrado ou em andamento 
      const status = remaining <= 0 ? "done" : "progress";
      
      // Mostra a quantidade de jobs done ou em progress
      statusCount[status] += 1;

      // total de horas por dia de cada Job em progresso
      jobTotalHours = status == 'progress' ? jobTotalHours + Number((job['daily-hours'])) : jobTotalHours
      
      // spread operator, adiciona mais campos desde q definidos no objeto
      return {
        ...job, 
        remaining, 
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])  
      }
    })

    // qtd de horas que quero trabalhar dia(PROFILE) menos qtd de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;
      
    return res.render("index", { 
      jobs: updatedJobs, 
      profile: profile, 
      statusCount: statusCount, 
      freeHours: freeHours 
    });
  }
}

