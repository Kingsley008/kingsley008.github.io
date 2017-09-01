// 使用 require 先定义 moudule
module.exports = {
    // 封装一个随机取值的函数
    getRangeRandom: function (low, high) {
        var result = Math.random() * (high - low) + low;
        return Math.floor(result);
    }
}
