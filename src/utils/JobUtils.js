module.exports =  {
  remainingDays(job) {
    // calculo dos dias restantes para finalizar o trabalho
      // toFixed() serve para arredondar nrs quebrados 
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
  
      const createdDate = new Date(job.created_at);
      // o getDate() pega o dia atual e soma com o restante de dias p/ finalizar o trabalho
      // o Number forca o valor entre parenteses para numero
      const dueDay = createdDate.getDate() + Number(remainingDays)
      
      // data de vencimento
      const dueDateInMs = createdDate.setDate(dueDay);
      
      // diferenca do horario q vai vencer e o horario atual em milissegundos
      const timeDiffInMs = dueDateInMs - Date.now()
      
      //transformar milissegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24;
      
      // horario q vai vencer o job menos o dia em milissegundos arredondado pra baixo
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

      // restam x dias
      return dayDiff;
  },
  
  // usa nesse formato ["value-hour"] por causa do traço
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}