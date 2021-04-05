const BaseSalary = {}
BaseSalary.engineer = {
    perHour : 35,
    profit : 15,
    baseHours: 30 * 8
}
BaseSalary.officeWorker = {
    perHour : 26,
    profit : 10,
    baseHours: 30 * 8
}

const SocialSecurity = {}
SocialSecurity.ONP = {
    percentageSalary : 2.5
}
SocialSecurity.AFP = {
    percentageSalary : 3.5
}

class SalaryService {
    
    constructor(
        BaseSalary,
        SocialSecurity
    ){
        this.baseSalary = BaseSalary
        this.socialSecurity = SocialSecurity
        this.errors=[]
    }

    calculateBaseSalary(worker){
        const totalHourInMoth = 30*8;
        let baseSalary = 0
        let PaymentperHour = this.baseSalary[worker.type].perHour;
        if (PaymentperHour){
            baseSalary = PaymentperHour * totalHourInMoth
        }
        console.log('base salary : ', baseSalary);
        return baseSalary

    }

    calculateProductivityProfit(hours,typeWorker,partialPayment){
        const profitPeerPosition = this.baseSalary[typeWorker].profit
        if(profitPeerPosition){
            if(hours > this.baseSalary[typeWorker].baseHours){
                var hoursExceeded = hours - this.baseSalary[typeWorker].baseHours
                console.log('with profit : ', partialPayment + (hoursExceeded * profitPeerPosition));
                return partialPayment + (hoursExceeded*profitPeerPosition)
            }else{
                return partialPayment
            }
        }else{
            this.errors.push({msg : 'error in productivity profit'})
            return 0
        }
    }

    calculateWithSocialSecurity(socialSecurity,partialPayment){
        var processed = 0

        try{
            let percentageSalary = this.socialSecurity[socialSecurity].percentageSalary
            if (percentageSalary) {
                processed = partialPayment - (partialPayment * percentageSalary / 100)
                console.log('with social security : ',processed);
            }
        }catch(err){
            this.errors.push({msg : 'error in process social security'})
        }

        return processed
    }

    calculateWithIRPF(partialPayment){
        let percetage = 5.2;
        console.log('with IRPF : ', partialPayment - (partialPayment * percetage / 100));
        return partialPayment - (partialPayment*percetage/100)
    }

    processPayment(worker){
        let baseSalary = this.calculateBaseSalary(worker)
        let withProductivityProfit = this.calculateProductivityProfit(
            worker.hours,
            worker.type,
            baseSalary)
        let withSocialSecurity = this.calculateWithSocialSecurity(
            worker.socialSecurity, 
            withProductivityProfit)
        let withIRPF = this.calculateWithIRPF(withSocialSecurity)
        if(this.errors.length > 0){
            console.log('errors',this.errors);
        }
        return withIRPF;
    }
}

const app = () => {
    
    const salaryService = new SalaryService(
        BaseSalary,
        SocialSecurity
        )

    const worker = {
        name : 'erick grandez',
        socialSecurity : 'AFP',
        hours : (30*8) + 24,
        type : 'engineer',
    }

    let totalSalary = salaryService.processPayment(worker)

    console.log('total salary : ',totalSalary);
}

app()