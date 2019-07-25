<template>
  <div class="addGood">
    <div class="addGoodContent">
      <a-row type="flex">
        <a-col :span="8"></a-col>
        <a-col :span="8">预约取件</a-col>
        <a-col :span="8"></a-col>
      </a-row>

      <a-row type="flex">
        <div>
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item
              label="运单号"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input v-decorator="[
          'goodId']" placeholder="输入运单号" />
            </a-form-item>

            <a-form-item v-bind="formItemLayout" label="取件时间">
              <a-date-picker
                v-decorator="['loaclDateTime']"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">预约</a-button>

              <a-button type="primary">取消</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'   
export default {
  name: "addGood",

  data() {
    return {
      form: this.$form.createForm(this),
      goodId:'',
      loaclDateTime:null,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    };
  },

  methods: {
        ...mapActions([
      'addItem', // map `this.getAllItem()` to `this.$store.dispatch('getAllItem')`
      
    ]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const values = {
          ...fieldsValue,
          goodId:fieldsValue["goodId"],
          loaclDateTime: fieldsValue["loaclDateTime"],
        };
      
        if(values!=null){
 
          let item={
              goodId:values.goodId,
              loaclDateTime:values.loaclDateTime,
              
          }
          this.addItem(item);
          this.goodId='';
          this.loaclDateTime='';   
          
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
