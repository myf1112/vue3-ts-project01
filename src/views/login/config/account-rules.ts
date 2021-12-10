export const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change'
    },
    {
      pattern: /^[A-Za-z0-9]{4,10}$/,
      message: '用户名格式错误',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    },
    {
      pattern: /^[A-Za-z0-9]{6,10}$/,
      message: '密码格式错误',
      trigger: 'change'
    }
  ]
};
