<template>
    <div class="wra">
        <div class="header">
           
            <div :class="{'end':1,'chosen':1}">题库管理</div>
        </div>
        <div class="second">
          
            <div class="search">
               <span>题库名称：</span><a-input-search
      v-model:value="value"
      placeholder="请输入"
      style="width: 250px"
      @search="onSearch"
    />
            </div>
            <div class="bt"><a-button type="primary" style="
    border-radius: 4px;
    width: 100px;
    background-color:#5784ff;
" @click="start(1)">创建题库</a-button></div>
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:7}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="toDetail(record)" style="color:#45d793"> 查看 </a>
      <a @click="start(2)" style="color:#ffbb65">编辑 </a>
      <a style="color:#dc5716">删除</a>
      </div>
     
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible"  @ok="handleOk" cancelText="取消" okText="确定" >
           <div class="create">
             <div class="title" v-if="isCreate">创建题库</div>
             <div class="title" v-else>编辑题库</div>
             <div class="main">
               <a-input v-model:value="create.name" placeholder="Basic usage" style="border-radius: 5px;background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;" />
                <a-select
    v-model:value="create.role"
  
    style="width: 100%;margin-top:10px;border-radius: 5px;"
    placeholder="Tags Mode"
    :options="options"
    @change="handleChange"
    :showArrow="true"
  >
  </a-select>
   <a-textarea v-model:value="create.description" placeholder="Basic usage" :rows="4"  style="margin-top:10px;border-radius:5px;background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
}" />
   <div class="clearfix" style="margin-top:10px;width: 218px;
	height: 40px;border-radius: 5px;
	">
    <a-upload :file-list="create.fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button style="width:218px;height:30px;border:solid 2px #5783ff;color:#5783ff">
        <upload-outlined></upload-outlined>
        Select File
      </a-button>
    </a-upload>
     </div>
             </div>
           </div>
    </a-modal>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate,useRouter} from 'vue-router'
import { defineComponent, ref,onMounted, reactive} from 'vue';
export default defineComponent({
 
  
  setup() {
    //创建题库
   let create = reactive({
     name:'',
     role:[],
     description:'',
     fileList:[],
   })
   const handleRemove = file => {
      const index = create.fileList.value.indexOf(file);
      const newFileList = create.fileList.value.slice();
      newFileList.splice(index, 1);
      create.fileList.value = newFileList;
    };
    // 文件上传
    const beforeUpload = file => {
      create.fileList = [...create.fileList, file];
      console.log(create.fileList)
      return false
 
    };
   //假数据
   const options = ref([
      {
        value: 'jack',
        label: 'Jack (100)',
      },
      {
        value: 'lucy',
        label: 'Lucy (101)',
      },
    ]);
        const handleChangeC = (value) => {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    };
    //查看题库
    function toDetail(record){
      console.log(record)
      router.push({path:'/tikuDetail',query:{key:record}})
      
    }
    //对话框
    let isCreate = ref(true)
     const visible = ref(false);
    function start(i){
        if(i==1){
          isCreate.value = true
        }
        if(i==2){
          isCreate.value = false
          //todo 将原有数据赋给create
        }
      
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
      title: '题库名称',
      width: 150,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '试题数量',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
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
    }, {
      title: '最后修改时间',
      dataIndex: 'address',
      key: '1',
      width: 150,
      align: 'center'
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
      isCreate,
      handleRemove,
      beforeUpload,
      options,
      handleChangeC,
      create,
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
.create{
  width: 100%;
  height: 100%;
  
  .title{
  margin: auto;
    font-size: 20px;
    width: 120px;
	height: 40px;
	font-family: Microsoft YaHei;
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #5783ff;
   
  }
  .main{
    width: 90%;
    margin: auto;
    margin-top: 20px;
    /deep/.ant-select:not(.ant-select-customize-input) .ant-select-selector{
      border-radius: 5px;
      background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
    }

  
   :global(.ant-modal-footer  button:nth-child(1)){
       display: none;
      }
        :global(.ant-modal-footer  button:nth-child(2)){
width: 188px;
	height: 41px;
	background-color: #5783ff;
	border-radius: 8px;

      width: 100px;
     
      border-radius: 5px;
      }
    :global(.ant-modal-footer){
      display: flex;
      justify-content: center;
      button:nth-child(1){
       
      }
   
      
    }
  }
}
.wra{
    width: 98% !important;
    height: 95% !important;
  
    background-color: #eceff8;
    margin: auto;
    margin-top: 20px;
    

    .header{
        width: 40%;
        height: 7%;
        display: flex;
       
        justify-content: flex-start;
        margin-left: 20px;
        align-items: center;
        font-size: 20px;
        margin-bottom: 10px;
        
        .chosen{
          color: #3a4167;
          font-weight: 500;
        }
        .myExam{
            font-size: 20px;
            color: black;
        }
    }

    .second{
        align-items: center;
        margin-top: 10px;
        width: 98%;
        height: 65px;
        display: flex;
        justify-content: space-between;
        margin: auto;
        border-radius: 5px;
        background-color: white;
        margin-bottom: 10px;
        .bt{
          border-radius: 10px;
          margin-right: 20px;
        }

        .search{
          span{
 color: #3a4167;
          }
         
          margin-left: 20px;
        }
    }
    .main{
        width: 98%;
        height: 83%;
        color: #3a4167 !important;
        margin:auto;
        /deep/.ant-table-tbody > tr > td:nth-child(6){
         

        }
        /deep/.ant-table-thead > tr:first-child > th{
          background-color:#f6f7fc ;
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