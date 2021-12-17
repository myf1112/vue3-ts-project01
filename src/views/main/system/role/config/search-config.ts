import { IFormConfig } from '@/base-ui/my-form/types/type';

const userSearchConfig: IFormConfig = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px',
    minWidth: '150px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限',
      placeholder: '请输入权限'
    },

    {
      field: 'data',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
};

export default userSearchConfig;
