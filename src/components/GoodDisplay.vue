<template>
  <div class="">
    <a-row type="flex" :gutter="10">
      <a-col :span="3">菜鸟驿站</a-col>
      <a-col :span="3"></a-col>
      <a-col :span="3">
        <a-button @click="showAll">ALL</a-button>
      </a-col>
      <a-col :span="3">
        <a-button @click="showBooked">已预约</a-button>
      </a-col>
      <a-col :span="3">
        <a-button @click="showPacked">已取件</a-button>
      </a-col>
      <a-col :span="3">
        <a-button @click="showNotPacked">未预约</a-button>
      </a-col>
      <a-col :span="3">
        <a-button @click="showModal">添加</a-button>
      </a-col>
    </a-row>
   
      <a-table  :dataSource="showItems" :columns="columns" >
        <template slot="name" slot-scope="text, record">
        </template>
        <template slot="operation" slot-scope="text, record">
        <a-button @click="changeRecored(record)">确认收货</a-button>
        </template>
      </a-table>
    
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
              <a-input placeholder="id" v-model="package.id"></a-input>
            </a-col>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="3">收件人:</a-col>
            <a-col :span="3">
              <a-input placeholder="recipient" v-model="package.customerName"></a-input>
            </a-col>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="3">电话:</a-col>
            <a-col :span="3">
              <a-input placeholder="phone" v-model="package.phone"></a-input>
            </a-col>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="3">重量:</a-col>
            <a-col :span="3">
              <a-input placeholder="weight" v-model="package.weigth"></a-input>
            </a-col>
          </a-row>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import addGoodFromBoos from "./addGoodFromBoss";
export default {
  name: "GoodDisplay",
  components: {
    addGoodFromBoos
  },
  data() {
    return {
      form: this.$form.createForm(this),
      package: {
        id: "",
        customerName: "",
        phone: "",
        weigth: ""
      },
      dataSource: [],
      columns: [
        {
          title: "运单号",
          dataIndex: "id",
          width: "30%",
          scopedSlots: { customRender: "id" }
        },
        {
          title: "收件人",
          dataIndex: "customerName"
        },
        {
          title: "phone",
          dataIndex: "phone"
        },
        {
          title: "状态",
          dataIndex: "state"
        },
        {
          title: "预约时间",
          dataIndex: "loaclDateTime"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      visible: false,
      confirmLoading: false
    };
  },

  computed: {
    showItems() {
      return this.$store.getters.getTodos;
    }
  },
  created() {
    this.getAllItem();
  },
  methods: {
    ...mapActions([
      "addItemFromBoss", // map `this.getAllItem()` to `this.$store.dispatch('getAllItem')`
      "getAllItem",
      "getItemByState",
      "changeState"
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
     
      });
    },
    onChange(key) {
    //   const dataSource = [...this.dataSource];
    //   this.dataSource = dataSource.filter(item => item.key !== key);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      if (
        this.package.customerName != "" &&
        this.package.phone != "" &&
        this.package.weigth != ""
      ) {
        let item = {
          id: this.package.id,
          customerName: this.package.customerName,
          phone: this.package.phone,
          weight: this.package.weigth,
          state: "未预约"
        };

        this.addItemFromBoss(item);

        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      }
    },
    handleCancel(e) {
      this.visible = false;
    },
    showAll() {
      this.getAllItem();
    },
    showBooked(){
      this.getItemByState("已预约")
    },
    showPacked(){
       this.getItemByState("已取件")
    },
    showNotPacked(){
      this.getItemByState("未预约")
    },
    changeRecored(recoed){
        this.changeState(recoed);
    }
  }
};
</script>
<style scoped lang="scss">
</style>
