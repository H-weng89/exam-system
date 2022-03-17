<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">我的考试</div>
            <div :class="{'wait':1,'chosen':key==1}">未开始</div>
            <div :class="{'ing':1,'chosen':key==2}">进行中</div>
            <div :class="{'end':1,'chosen':key==3}">已结束</div>
        </div>
        <div class="second">
            <div class="subject">
                学科：<a-select
      ref="select"
      v-model:value="value1"
      style="width: 250px"
      @focus="focus"
      @change="handleChange"
      placeholder="选择学科"
    >
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
            </div>
            <div class="search">
                 考试名称：<a-input-search
      v-model:value="value"
      placeholder="请输入"
      style="width: 250px"
      @search="onSearch"
    />
            </div>
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}">
    <template #action>
      <a @click="start">进入考试</a>
  
    </template> 
  </a-table>
         
 <a-modal v-model:visible="visible" title="考试详情" @ok="handleOk" cancelText="取消" okText="确定" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  
        </div>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate} from 'vue-router'
import { defineComponent, ref,} from 'vue';
export default defineComponent({
 
  
  setup() {
    //是否进入考试
    const visible = ref(false);
    function start(){
      visible.value = true
    }
    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };
     let route = useRoute()
     let key = ref(route.query.key)
     onBeforeRouteUpdate(to=>{
       key.value = to.query.key
     })
   const columns = ref([{
      title: '考试名称',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    }, {
      title: '考试时间',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    }, {
      title: '考试时长',
      dataIndex: 'address',
      key: '1',
      width: 150,
    }, {
      title: '考试总分',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
   
     {
      title: '考试次数',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
      {
     title:'操作',
      key: 'operation',
      dataIndex:'operation',
       slots: {
      customRender: 'action',
    },
      
    
      width: 100,
    }, {
      title: '我的得分',
      dataIndex: 'address',
      key: '4',
      width: 150,
    }, ]);
    const data = [
     

    ];

    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
        // operation:'进入考试'
        
      });
    }
    
  //学科选择和搜索
const value = ref('');

    const onSearch = searchValue => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
    };

    const focus = () => {
      console.log('focus');
    };

    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    //表格

    return {
      focus,
      handleChange,
      value,
      onSearch,
      key,
 data,
 columns,
 visible,
 start,
 handleOk
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
.wra{
    width: 98% !important;
    height: 95% !important;
  
    background-color: white;
    margin: auto;
    margin-top: 20px;
    .header{
        width: 40%;
        height: 7%;
        display: flex;
       
        justify-content: space-around;
        align-items: center;
        font-size: 16px;
        color: gray;
        .chosen{
          color: black;
        }
        .myExam{
            font-size: 20px;
            color: black;
        }
    }

    .second{
        align-items: center;
        margin-top: 10px;
        width: 55%;
        height: 7%;
        display: flex;
        justify-content: space-around;
    }
    .main{
        width: 98%;
        height: 84%;
        margin:auto;
        /deep/.ant-table-tbody > tr > td:nth-child(6){
          color: blue;

        }
         /deep/.ant-table-tbody > tr > td:nth-child(6):hover{
           cursor: pointer;
         }
       
        
    }
}

</style>