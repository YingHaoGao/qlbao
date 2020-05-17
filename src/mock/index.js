
//引入mockjs
import Mock from 'mockjs';

/**
 * sign
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