'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

//stripeドキュメントより
const stripe = require('stripe')('sk_test_51LR5F1HmHEVRGKagd3UdHBFncEynY6fnaQoaaS1nTdXwiYuXxw6IJEt0En1TBhgliwa14ki3Idd8yrAw2qjaBF8h00TuWgPUIO');



module.exports = {

    //注文を作成する
    create: async (ctx) => {
        //送信データをJSONオブジェクトとして受け取る
        const { address, amount, dishes, token } = JSON.parse(ctx.request.body)
        //stripeドキュメントより
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'jpy',
            source: token,
            description: `Order ${new Date()} by ${ctx.state.user._id}`,
        });
        //strapi側に保存するロジック(strapiに用意されているcreateメソッド使用)
        const order = await strapi.services.order.create({
            user: ctx.state.user._id,
            chage_id: charge.id,
            amount: amount,
            address,
            dishes,
        })
        return order
    }
};
