export const rules = {
  phoneNumber: [
    { required: true, message: '电话号码是必传内容', trigger: ' blur' },
    {
      pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
      message: '电话号码格式错误',
      trigger: 'blur'
    }
  ],
  identifyCode: [
    { required: true, message: '验证码是必传内容', trigger: 'blur' },
    {
      pattern: /^[0-9]{4}$/,
      message: '验证码格式错误',
      trigger: 'blur'
    }
  ]
};
