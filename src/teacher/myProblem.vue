<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">考试</div>
           
            <div :class="{'ing':1}">试题管理</div>
            <div :class="{'end':1,'chosen':1}">我的试卷</div>
        </div>
        <div class="second">
          
            <div class="search">
                 试卷名称：<a-input-search
      v-model:value="value"
      placeholder="请输入"
      style="width: 250px"
      @search="onSearch"
    />
            </div>
            <div class="bt"><a-button type="primary" style="
    border-radius: 4px;
    width: 100px;
" @click="start(0)">创建试卷</a-button></div>
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">

      <a @click="start(record)">编辑 </a>
      <a>删除</a>
      </div>
     
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible" title="题库详情" @ok="handleOk" cancelText="取消" okText="确定" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate,useRouter} from 'vue-router'
import { defineComponent, ref,onMounted} from 'vue';
export default defineComponent({
 
  
  setup() {
    //查看题库
    function toDetail(record){
      console.log(record)
      router.push({path:'/tikuDetail',query:{key:record}})
      
    }
    //对话框
     const visible = ref(false);
    function start(i){
      i
      
      visible.value = true
    }
    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };
    //判断
    let route = useRoute()
    let router = useRouter()
    let key = ref(route.query.key)
onBeforeRouteUpdate(to => {
     key.value = to.query.key
});
    onMounted(()=>{
      //根据key获取数据
      key.value = route.query.key
    })
   const columns = ref([{
      title: '试卷名称',
      width: 150,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '试卷总分',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
    {
      title: '查看权限',
      dataIndex: 'address',
      key: '1',
      width: 150,
      align: 'center'
    },
     {
     title:'操作',
      key: 'operation',
      dataIndex:'operation',
      align: 'center',
       slots: {
      customRender: 'action',
    },
      
    
      width: 50,
    },  ]);
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
 data,
 columns,
 key,
 start,
 handleOk,
 visible,
 toDetail
    
 
 
    
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
        width: 95%;
        height: 7%;
        display: flex;
        justify-content: space-between;
        margin-left: 25px;
        .bt{
          border-radius: 10px;
        }
    }
    .main{
        width: 98%;
        height: 84%;
        margin:auto;
        /deep/.ant-table-tbody > tr > td:nth-child(6){
          color: blue;

        }
        .operate{
          display: flex;
          justify-content: space-around;
        }
         /deep/.ant-table-tbody > tr > td:nth-child(6):hover{
           cursor: pointer;
         }
       
        
    }
}

</style>