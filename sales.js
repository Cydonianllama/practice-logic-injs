const DiscountTypes = {}
DiscountTypes.not = {
    percentageDiscount : 0
}
DiscountTypes.navidad = {
    percentageDiscount : 5
}
class SalesService {
    
    constructor(
        DiscountTypes
    ){
        this.discountType = DiscountTypes
    }

    calculateWithIGV(currentTotalPrice){
        const IGVpercentage = 18
        return currentTotalPrice + (currentTotalPrice * IGVpercentage / 100)
    }

    calculateWithProfit(currentTotalPrice){
        const profitPercentage = 20;
        return currentTotalPrice + (currentTotalPrice * profitPercentage / 100)
    }

    calculateWithDiscounts(percentage,currentProductPrice){
        return currentProductPrice - (currentProductPrice * percentage / 100)
    }

    processPayment(order){

        const percentageDiscountOrder = order.discount
        const products = order.products
        var partialPrice = 0
        var pricesProduct = []
        products.forEach(product => {
            let discount = this.discountType[product.discountType].percentageDiscount
            let productPrice = product.unitaryPrice - (product.unitaryPrice*discount/100)
            let finalProductsPrice = productPrice * product.quantity
            pricesProduct.push({ 
                product: product.idProduct,
                unitaryprice: productPrice,
                quantity : product.quantity,
                totalPrice : finalProductsPrice
            })
            partialPrice = partialPrice + finalProductsPrice
        })
        const withProfit = this.calculateWithProfit(partialPrice)
        const withIGV = this.calculateWithIGV(withProfit)
        const finalPrice = this.calculateWithDiscounts(percentageDiscountOrder,withIGV)

        console.table(pricesProduct);
        console.log('sum prices : ',partialPrice);
        console.log('with profit : ',withProfit);
        console.log('with IGV : ',withIGV)
        console.log('final price (with discounts): ',finalPrice);

    }

}

const app = () => {
    const salesService = new SalesService(DiscountTypes);
    const order = {
        code : 'order-aaa-1',
        discount : 5,
        products : [
            {
                idProduct : 'product-aaa-1',
                typePack : 'single',
                unitaryPrice : 15,
                discountType : 'navidad',
                quantity : 5
            },
            {
                idProduct: 'product-aaa-2',
                typePack: 'single',
                unitaryPrice: 30,
                discountType: 'navidad',
                quantity: 2
            },
            {
                idProduct: 'product-aaa-3',
                typePack: 'single',
                unitaryPrice: 110,
                discountType: 'not',
                quantity: 1
            }
        ]
    }
    salesService.processPayment(order)
}
app()