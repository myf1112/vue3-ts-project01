export const pageContentConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'oldPrice', label: '原价', minWidth: '100' },
    { prop: 'newPrice', label: '打折后', minWidth: '100' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'img' },
    { prop: 'address', label: '发货地', minWidth: '100' },

    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
};
