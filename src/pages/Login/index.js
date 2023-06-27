import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  async function onFinish (values) {
    console.log(values)
    // values：放置的是所有表单项中用户输入的内容
    // todo:登录
    await loginStore.login({
      mobile: values.username, code: values.password
    })
    // 跳转首页
    navigate('/')
    // 提示用户
    message.success('登录成功')
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: true,
            username: '13811111111',
            password: '246810'
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'Incorrect phone number format',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="Please enter your phone number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' }
            ]}
          >
            <Input size="large" placeholder="Please enter verification code" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              I have read and agree to the "User Agreement".
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login