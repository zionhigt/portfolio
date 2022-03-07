class Quotation {
    constructor(data, config) {
        this.quotationData = data;
        this.config = config;
        this.data = {
            data: this.quotationData,
            config: this.config

        }
    }
    sumation(list, key) {
        return list.map(function(item) {
            return item[key];
        }).reduce(function(a, b) {
            return parseFloat(a) + parseFloat(b);
        });
    }
    formatDate() {
        return (new Date()).toLocaleDateString('fr-FR');
    }
    
    formatRef(no) {
        const today = this.formatDate();
        const todaySplited = today.split('/');
        const delta = 4 - no.toString().length;
        no = delta > 0 ? "0".repeat(delta) + no : no;
        return "QUOT-" + todaySplited.join("") + "-" + no;
    }
    
    twoAfterComa(longNum) {
        return Math.round(longNum * 100) / 100;
    }
    
    untaxing(taxed) {
        const toUntaxed = 1 + this.config.taxeAmount / 100;
        const totalUntaxed = taxed / toUntaxed;
        return this.twoAfterComa(totalUntaxed);
    }
    
    formatEndDate() {
        const today = new Date();
        const dateEnd = new Date();
        dateEnd.setDate(today.getDate() - 1);
        dateEnd.setMonth(today.getMonth() + 1);
        return dateEnd.toLocaleDateString('fr-FR');
    }

    get() {
        const totalTaxed = this.sumation(this.data.data.services, 'price');
        const totalUntaxed = this.untaxing(totalTaxed);
        const total = {
            days: this.sumation(this.data.data.services, 'time'),
            untaxed: this.twoAfterComa(totalUntaxed),
            taxeAmount: this.config.taxeAmount,
            taxed: totalTaxed,
        }
        this.data.data['total'] = total;
        const services = this.data.data.services.map(function(service) {
            service["taxed"] = service.price;
            service["untaxed"] = this.untaxing(service.price);
            service["taxeAmount"] = this.config.taxeAmount;
            return service;
        }.bind(this));
        this.data.data.quotation['ref'] = this.formatRef(this.data.data.quotation.no);
        this.data.data.quotation['dateStart'] = this.formatDate();
        this.data.data.quotation['dateEnd'] = this.formatEndDate();
        this.data.data.services = services;
        return this.data;
    }
}

module.exports = Quotation;