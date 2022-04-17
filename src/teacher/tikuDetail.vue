<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">我的题库:xxx题库</div>
           
          
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
        
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action="{record}">
        <div class="opetate">
 <a @click="toDetail(record)" style="color:#45d793">查看</a>
      <a @click="start(1)" style="color:#ffbb65">编辑</a>
      <a style="color:#dc5716">删除</a>
        </div>
    
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible"  @ok="handleOk" cancelText="取消" okText="确定" >
  <div class="create">
             
             <div class="title">添加试题</div>
             <div class="main">
               <div class="problem">
                 <div class="name">题目</div>
                   <a-textarea v-model:value="create.name" placeholder="答案与解析" :rows="2"  style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;"/>

   
               </div>
           


               
 <div class="choose" v-if="key==1">
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
                 <div class="name">答案/答案解析</div>
                 <div class="an">  <a-textarea v-model:value="create.answer" placeholder="答案与解析" :rows="4"  style="background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;"/>
</div>

               </div>
               </div>            
           </div>
    </a-modal>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate} from 'vue-router'
import { defineComponent, ref,onMounted,reactive} from 'vue';
import api from '../api/axios'
export default defineComponent({
 
  
  setup() {
    //对话框
    
let data = ref([])
     const visible = ref(false);
      let create = reactive({
      name:'',
      choose:[{label:'A',value:''}],
      answer:'',
    
    })

     let toDetail = (e)=>{
       create.name = e.body
       create.choose = [{label:'A',value:e.a},{label:'b',value:e.b},{label:'C',value:e.c},{label:'D',value:e.d}]
         create.answer = e.ans
   
        visible.value = true


     }
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
    let key = ref(route.query.key)
onBeforeRouteUpdate(to => {
     key.value = to.query.key
});

let type = ref(route.query.type)

    onMounted(async ()=>{
      //根据key获取数据
      key.value = route.query.key
     let result  = await api.getProblem(key.value).catch(err=>{console.log(err)})
      data.value = result.data.data.questions
      console.log(result)
       if(type.value=='selections'){
         data.value.forEach(item=>{
           item.type = '选择题'
         })

       }
          if(type.value=='blanks'){
         data.value.forEach(item=>{
           item.type = '填空题'
         })

       }
        if(type.value=='answerQuestions'){
         data.value.forEach(item=>{
           item.type = '大题'
         })

       }
       



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
    }, ]);
   

    // for (let i = 0; i < 100; i++) {
    //   data.push({
    //     key: i,
    //     name: `Edrward ${i}`,
    //     age: 32,
    //     address: `London Park no. ${i}`,
    //     // operation:'进入考试'
        
    //   });
    // }
    
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
 toDetail,
 create
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
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
            color: #3a4167;
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
          color: blue;

        }
        /deep/.ant-table{
        
        }
        .opetate{
          display: flex;
          justify-content: space-around;
        }
         /deep/.ant-table-tbody > tr > td:nth-child(6):hover{
           cursor: pointer;
         }
       
        
    }
}

</style>