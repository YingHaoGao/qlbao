
//引入mockjs
import Mock from 'mockjs';

/**
 * 注册页
 */
//获取图形码
Mock.mock('/api/getGraphics',/get/i, (req, res) => {
    return {
        graphics: 'WHJD'
    }
})

//获取验证码
Mock.mock('/api/getCode', (req, res) => {
    return {
        code: '1234'
    }
})


//提交注册
Mock.mock('/api/sign', (req, res) => {
    return {
        id: 123
    }
})

/**
 * 结算页
 */
// 查询价格档位
Mock.mock('/api/getPrices', (req, res) => {
    return [
    	{
    		name: '3个月',
    		id: 3
    	},
    	{
    		name: '6个月',
    		id: 6
    	},
    	{
    		name: '12个月',
    		id: 12
    	},
    ]
})

// 提交结算单
Mock.mock('/api/statement', (req, res) => {
    return {
        
    }
})

/**
 * 支付完成
 */
// 查询状态
Mock.mock('/api/getType', (req, res) => {
    return {
    	list: [
	    	{
	    		name: '张三',
	    		phone: '18600408533',
	    		operator: '联通',
	    		type: 1
	    	},
	    	{
	    		name: '张三',
	    		phone: '18600408533',
	    		operator: '联通',
	    		type: 1
	    	},
	    ],
	    type: 1
    }
})

// 追加自助开通号码数量
Mock.mock('/api/appendNum', (req, res) => {
    return {
        
    }
})

