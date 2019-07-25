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
      <a-col :span="3">
        <a-button>已取件</a-button>
      </a-col>
      <a-col :span="3">
        <a-button>未预约</a-button>
      </a-col>
      <a-col :span="3">
        <a-button @click="showModal">添加</a-button>
      </a-col>
    </a-row>
    <a-row type="flex">
      <a-table bordered :dataSource="dataSource" :columns="columns">
        <template slot="name" slot-scope="text, record">
          <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">确认收货</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-row>
    <div>
      <a-modal
        title
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <div class="modalform">

      
        <a-row type="flex" justify="center">
          <a-col :span="3">包裹入库</a-col>
        </a-row>

        <a-row type="flex" justify="center">
          <a-col :span="3">订单号:</a-col>
          <a-col :span="3">
            <a-input placeholder="id" v-model="package.id" >
            </a-input>
          </a-col>
        </a-row>
        <a-row type="flex" justify="center">
          <a-col :span="3">收件人:</a-col>
          <a-col :span="3">
            <a-input placeholder="recipient" v-model="package.customerName" >
            </a-input>
          </a-col>
        </a-row>
<a-row type="flex" justify="center">
          <a-col :span="3">电话:</a-col>
          <a-col :span="3">
            <a-input placeholder="phone" v-model="package.phone" >
            </a-input>
          </a-col>
        </a-row>
        <a-row type="flex" justify="center">
          <a-col :span="3">重量:</a-col>
          <a-col :span="3">
            <a-input placeholder="weight" v-model="package.weigth" >
            </a-input>
          </a-col>
        </a-row>
          </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'  
import addGoodFromBoos from "./addGoodFromBoss";
export default {
  name: "GoodDisplay",
  components: {
    addGoodFromBoos
  },
  data() {
    return {
      form: this.$form.createForm(this),
       package:{
        id:'',
        customerName:'',
        phone:'',
        weigth:'',
       },
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
      dataSource: [
        {
          key: "0",
          itemid: "Edward King 0",
          recipient: "32",
          phone: "London, Park Lane no. 0",
          state: "已取件",
          time: "ddd",
        }
      ],
      count: 2,
      columns: [
        {
          title: "itemid",
          dataIndex: "itemid",
          width: "30%",
          scopedSlots: { customRender: "itemid" }
        },
        {
          title: "recipient",
          dataIndex: "recipient"
        },
        {
          title: "phone",
          dataIndex: "phone"
        },
        {
          title: "state",
          dataIndex: "state"
        },
        {
          title: "time",
          dataIndex: "time"
        },
        {
          title: "operation",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      visible: false,
      confirmLoading: false
    };
  },

  methods: {
         ...mapActions([
      'addItemFromBoss', // map `this.getAllItem()` to `this.$store.dispatch('getAllItem')`
      
    ]),
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
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
       if(this.package.customerName!=''&&this.package.phone!=''&&this.package.weigth!=''){
           let item={
               id:this.package.id,
              customerName: this.package.customerName,
              phone:this.package.phone,
              weight:this.package.weigth,
              state:'未预约'            
          }

        this.addItemFromBoss(item);

        setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);

       }
    },
    handleCancel(e) {
      this.visible = false;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
