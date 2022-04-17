<template>
    <div class="wra">
        <div class="header">
         
           
            <div :class="{'ing':1,'chosen':1}">试题管理</div>
          
        </div>
        <div class="second">
          
            <div class="search">
                 题目：<a-input-search
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
" @click="start(0)">添加试题</a-button></div>
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
  <a @click="toDetail(record)" style="color:#45d793"> 查看 </a>
    
      </div>
     
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible"  @ok="handleOk" @cancel="cancel" cancelText="取消" okText="确定" >
        <div class="create" v-if="!flag">
             <!-- <div class="title" v-if="isCreate">创建题库</div> -->
             <div class="title">添加试题</div>
             <div class="main">
               <div class="problem">
                 <div class="name">题目</div>
                   <a-textarea v-model:value="create.name" placeholder="答案与解析" :rows="2"  style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;"/>

   
               </div>
           


               
           
               <a-tabs v-model:activeKey="activeKey" >
    <a-tab-pane key="1" tab="选择题"> <div class="choose">
                 <div class="name">选项</div>
                 <div class="item" v-for="(item,key) in create.choose" :key="key">
                   <div class="label">{{item.label}}:</div>
                    <a-input v-model:value="item.value" placeholder="输入选项" style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;height:30px" />
                 </div>
                 <div class="add"><a-button type="primary" style="width: 130px;
	height: 30px;
	background-color: #5783ff;
	border-radius: 8px;" @click="add">添加选项</a-button></div>
               </div></a-tab-pane>
    <a-tab-pane key="2" tab="填空题" force-render></a-tab-pane>
    <a-tab-pane key="3" tab="大题"></a-tab-pane>
  </a-tabs>
              
               <div class="answer">
                 <div class="name">答案</div>
                 <div class="an">  <a-textarea v-model:value="create.answer" placeholder="答案(选择题填abcd,不分大小写)" :rows="4"  style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;"/>
</div>

               </div>
               </div>        
                   <a-select
    v-model:value="storeId"
  
    style="width: 100%;margin-top:10px;border-radius: 5px;"
    placeholder="插入题库"
    :options="option1"
    @change="handleChange"
    :showArrow="true"
  >
  </a-select>    
           </div>
             <div class="create1" v-if="flag">
             
             <div class="title">添加试题</div>
             <div class="main">
               <div class="problem">
                 <div class="name">题目</div>
                   <a-textarea v-model:value="create.name" placeholder="答案" :rows="2"  style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;"/>

   
               </div>
           


               
 <div class="choose" v-if="isChoose">
                 <div class="name">选项</div>
                 <div class="item" v-for="(item,key) in create.choose" :key="key">
                   <div class="label">{{item.label}}:</div>
                    <a-input v-model:value="item.value" placeholder="输入选项" style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;height:30px" />
                 </div>
                 <div class="add"><a-button type="primary" style="width: 130px;
	height: 30px;
	background-color: #5783ff;
	border-radius: 8px;" @click="add">添加选项</a-button></div>
               </div>
              
               <div class="answer">
                 <div class="name">答案</div>
                 <div class="an">  <a-textarea v-model:value="create.answer" placeholder="答案" :rows="4"  style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;"/>
</div>

               </div>
            
               </div>         
                   <a-select
    v-model:value="storeId"
  
    style="width: 100%;margin-top:10px;border-radius: 5px;"
    placeholder="插入题库"
    :options="option1"
    @change="handleChange"
    :showArrow="true"
  >
  </a-select>   
           </div>
    </a-modal>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate,useRouter} from 'vue-router'
import { defineComponent, ref,onMounted, reactive} from 'vue';
import { message } from 'ant-design-vue';
import api from '../api/axios'

export default defineComponent({
 
  
  setup() {
    //查看题库
    let store = ref([])
    let option1 = ref([])
    let storeId = ref(null)
    let getdata = async ()=>{
     let result = await api.getStore()
     store.value = result.data.data
     store.value.forEach(async item=>{
               let result = await api.getProblem(item.id)
               item.size = result.data.data.size
     })

    
     console.log(result,data)

   }
    let isChoose = ref(false)
    function toDetail(e){
      create.name = e.body
       create.choose = [{label:'A',value:e.a},{label:'b',value:e.b},{label:'C',value:e.c},{label:'D',value:e.d}]
         create.answer = e.ans
      router
     
        flag.value = true
        if(e.a){
          isChoose.value  = true

        }
        
        visible.value = true
      
    }
    //创试题
    let create = reactive({
      name:'',
      choose:[{label:'A',value:''}],
      answer:'',
      store:''
    })
    //选项卡标识
 let activeKey =  ref('1')

 //弹窗flag
  let flag = ref(false)

    let add = ()=>{
      if(create.choose.length==1){
        create.choose.push({label:'B',value:''})
        return 
      }
      if(create.choose.length==2){
        create.choose.push({label:'C',value:''})
        return 
      }
      if(create.choose.length==3){
        create.choose.push({label:'D',value:''})
        return 
      }
      else{
        message.warn('暂时只开放四个选项')
      }
    }
    //对话框
     const visible = ref(false);
    function start(i){
       flag.value = false
       i 
       message.info('一个题库只能插入一种题型')
      
      visible.value = true
    }
    const handleOk = async e => {
      if(!flag.value){
e
             let item
             let data
             let result
             if(activeKey.value==1){
             item = {body:create.name,a:create.choose[0].value,b:create.choose[1].value,c:create.choose[2]?create.choose[2].value:'',d:create.choose[3]?create.choose[3].value:'',ans:create.answer,public:true}
             data = {selections:[item],store:storeId.value}
               result = await api.createProblem(data)

             }
            else if(activeKey.value==2){
               item = {body:create.name,ans:create.answer,public:true}
               data = {blanks:[item],store:storeId.value}
               result = await api.createProblem2(data)


             }
             else{
                item = {body:create.name,ans:create.answer,public:true}
               data = {answerQuestions:[item],store:storeId.value}
               result = await api.createProblem3(data)

             }
         
                 
                   if(result.data.code==200){
                     message.success(result.data.msg)
                   }
                   else{
                     message.warn(result.msg)
                   }
                   getData()
      }

      create.name = ''
      create.choose = [{label:'A',value:''}]
      create.answer = ''
        create = {
      name:'',
      choose:[{label:'A',value:''}],
      answer:'',
      store:''
    }
             
      visible.value = false;
    };
    //判断
    let route = useRoute()
    let router = useRouter()
    let key = ref(route.query.key)
onBeforeRouteUpdate(to => {
     key.value = to.query.key
});

async function getData(){
        let result = await api.getAllProblem()
      console.log(result)
      let answerQ = result.data.data.answerQuestions
      answerQ.forEach(item=>{
        item.type = '大题'
        if(item.public){
          item.role = '公开'
        }
        else{
          item.role = '私有'
        }
      })
      let blanks = result.data.data.blanks
      blanks.forEach(item=>{
        item.type = '填空题'
          if(item.public){
          item.role = '公开'
        }
        else{
          item.role = '私有'
        }
      })
      let choose = result.data.data.selections
      choose.forEach(item=>{
        item.type = '选择题'
          if(item.public){
          item.role = '公开'
        }
        else{
          item.role = '私有'
        }
      })
    data.value = [...answerQ,...blanks,...choose]
}
let data = ref([])
    onMounted(async ()=>{
      //根据key获取数据
      key.value = route.query.key

      //调整数据
  await getdata()
  console.log(store.value)
  store.value.forEach(item=>{
    let obj = {
      label:item.name,
      value:item.id
    }
    option1.value.push(obj)
  })
  console.log(option1.value)
      getData()





    })
   const columns = ref([{
      title: '题干',
      width: 100,
      dataIndex: 'body',
      ellipsis: true,
      key: 'body',
      fixed: 'left',
     
    }, {
      title: '题目类型',
      width: 100,
      dataIndex: 'type',
      key: 'type',
      fixed: 'left',
      align:'center'
     
    },
    // {
    //   title: '所属题库',
    //   width: 100,
    //   dataIndex: 'age',
    //   key: 'age',
    //   fixed: 'left',
    //      align:'center'
     
    // },
      {
      title: '查看权限',
      width: 100,
      dataIndex: 'role',
      key: 'role',
      fixed: 'left',
         align:'center'
     
    },
     {
     title:'操作',
      key: 'operation',
      dataIndex:'operation',
      align: 'center',
       slots: {
      customRender: 'action',
    },
      
    
      width: 100,
    }, {
      title: '最后修改时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 150,
      align: 'center'
    }, ]);
    

   
    
  //学科选择和搜索
const value = ref('');

    const onSearch = async searchValue => {
    
      let result = await api.searchProblem({key:searchValue})
      console.log(result)
        if(result.data.code==200){
          message.info(result.data.msg)
        }

    
    };

    const focus = () => {
      console.log('focus');
    };

    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    //表格
  let cancel = ()=>{
     create.name = ''
      create.choose = [{label:'A',value:''}]
      create.answer = ''
    visible.value = false
  }
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
 toDetail,
 create,
 add,
 activeKey,
 flag,
 isChoose,
 cancel,
 option1,
 storeId
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
.create1{
  width: 100%;
  height: 100%;
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
    width: 92%;
    margin: auto;
    /deep/.ant-tabs-bar{
      display: flex;
      justify-content: center;
    }

    .problem{
      .name{
        font-family: Microsoft YaHei;
	font-size: 16px;
  color: #5783ff;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
  margin-bottom: 5px;

      }
    }

    .choose{
      .name{
        font-family: Microsoft YaHei;
	font-size: 16px;
  color: #5783ff;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
  margin-bottom: 5px;
  margin-top: 10px;
      }
      .item{
        .label{	font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
	color: #5783ff;
    margin-right: 10px;
    

          
        }
        display: flex;
        margin-bottom: 10px;
      }

      .add{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }

    }

    .answer{
      .name{
        font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
	color: #5783ff;
      }
    }
  }
}
.create{
  width: 100%;
  height: 100%;
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
    width: 92%;
    margin: auto;
    /deep/.ant-tabs-bar{
      display: flex;
      justify-content: center;
    }

    .problem{
      .name{
        font-family: Microsoft YaHei;
	font-size: 16px;
  color: #5783ff;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
  margin-bottom: 5px;

      }
    }

    .choose{
      .name{
        font-family: Microsoft YaHei;
	font-size: 16px;
  color: #5783ff;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
  margin-bottom: 5px;
  margin-top: 10px;
      }
      .item{
        .label{	font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
	color: #5783ff;
    margin-right: 10px;
    

          
        }
        display: flex;
        margin-bottom: 10px;
      }

      .add{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }

    }
        .answer{
      .name{
        font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
	color: #5783ff;
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