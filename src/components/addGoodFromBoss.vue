<template>
  <div class="addGoodFromBoos">

    <div class="addGoodFromBoosContent">
     <a-row type="flex" >
      <div>
    <a-form 
     :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        label="运单号"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input 
         v-decorator="[
          'itemid']"
        placeholder="输入运单号" />
      </a-form-item>
 <a-form-item
        label="收件人"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input 
         v-decorator="[
          'recipient']"
        placeholder="输入收件人" />
      </a-form-item>
 <a-form-item
        label="电话"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input 
         v-decorator="[
          'phoneNumber']"
        placeholder="输入电话" />
      </a-form-item>
 <a-form-item
        label="重量"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input 
         v-decorator="[
          'weight']"
        placeholder="输入重量" />
      </a-form-item>

      <a-form-item
      >
        <a-button type="primary"  html-type="submit">
          预约
        </a-button>

         <a-button type="primary">
          取消
        </a-button>

      </a-form-item>
    </a-form>
  </div>
    </a-row>
  </div>
  </div>
</template>

<script>
export default {
  name: 'addGoodFromBoos',

  data () {
    return {
        form:this.$form.createForm(this),

         formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    };
  },

   methods: {
    handleSubmit  (e) {
   
      e.preventDefault();
     this.form.validateFields((err, fieldsValue) => {
       
       if (err) {
          return;
        }
             const values = {
          ...fieldsValue,
          'itemid': fieldsValue['itemid'],
           'recipient': fieldsValue['recipient'],
            'phoneNumber': fieldsValue['phoneNumber'],
             'weight': fieldsValue['weight'],
        }
        console.log('Received values of form: ', values);
    
    });
  }
   },
}
</script>

<style scoped lang="scss">

</style>
