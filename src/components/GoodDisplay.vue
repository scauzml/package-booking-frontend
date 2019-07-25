<template>
  <div class="GoodDisplay">
    <a-row type="flex" :gutter="10">
      <a-col :span="3">菜鸟驿站</a-col>
      <a-col :span="3"></a-col>
      <a-col :span="3">
        <a-button>ALL</a-button>
      </a-col>
      <a-col :span="3">
        <a-button>已预约</a-button>
      </a-col>
      <a-col :span="3"><a-button>已取件</a-button></a-col>
      <a-col :span="3"><a-button>未预约</a-button></a-col>
      <a-col :span="3"><a-button>添加</a-button></a-col>
    </a-row>
    <a-row type="flex">

 <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>

    </a-row>
  </div>
</template>

<script>
export default {
  name: "GoodDisplay",

  data() {
    return {
      form: this.$form.createForm(this),

      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
       dataSource: [{
        key: '0',
        itemid: 'Edward King 0',
        recipient: '32',
        phone: 'London, Park Lane no. 0',
        state:'已取件',
        time:'ddd'
      },],
      count: 2,
      columns: [{
        title: 'itemid',
        dataIndex: 'itemid',
        width: '30%',
        scopedSlots: { customRender: 'itemid' },
      }, {
        title: 'recipient',
        dataIndex: 'recipient',
      }, {
        title: 'phone',
        dataIndex: 'phone',
      }, 
       {
        title: 'state',
        dataIndex: 'state',
      },
   {
        title: 'time',
        dataIndex: 'time',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const values = {
          ...fieldsValue,
          dateTime: fieldsValue["dateTime"].format("YYYY-MM-DD HH:mm:ss")
        };
        console.log("Received values of form: ", values);
      });
    },
     onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
  }
};
</script>

<style scoped lang="scss">
</style>
