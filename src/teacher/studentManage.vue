<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">考生管理</div>
           
            
        </div>
        <div class="second">
          
            <div class="search">
                 对象相关信息：<a-input-search
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
" @click="start(0)">添加对象</a-button></div>
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:7}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="start(1,record)" style="color:#45d793"> 查看 </a>
      <!-- <a @click="start(1,record)" style="color:#ffbb65">查看 </a> -->
      <a style="color:#dc5716">删除</a>
      </div>
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible"  @ok="handleOk" cancelText="取消" okText="确定"   width="55%" height = "40%"  className = "model" style="	border-radius: 9px;">
           <div class="edit" v-if="!flag">
                    <div class="message">
               <div class="title">考试个人信息</div>
                <div class="main">
                  <div class="left">
                    <div>
                      <div class="name">*邮箱</div>
                     
                      <a-input v-model:value="message.mail" placeholder="Basic usage" style="
width: 22vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;" />
                    </div>
                     <div>
                      <div class="name">*姓名</div>
                     
                      <a-input v-model:value="message.name" placeholder="Basic usage" style="
width: 22vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;" />
                    </div> <div>
                      <div class="name">学校</div>
                     
                      <a-input v-model:value="message.school" placeholder="Basic usage" style="
width: 22vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;" />
                    </div> <div>
                      <div class="name">*学号</div>
                     
                      <a-input v-model:value="message.num" placeholder="Basic usage" style="
width: 22vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;" />
                    </div> <div>
                      <div class="name">专业班级</div>
                     
                      <a-input v-model:value="message.subject" placeholder="Basic usage" style="
width: 22vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;" />
                    </div>
                     
                  </div>
                  <div class="right">
                    <div>
                       <div class="name">备注信息</div>
                      <a-textarea v-model:value="value" placeholder="Basic usage" :rows="4" style="width: 22vw;
	height: 13vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;" />
                    </div>
                    <div>
                    
                    </div>
                  </div>
                </div>

           </div>

           </div>
           <div class="add" v-else>
              <div class="title">
                添加考试对象
              </div>
              <div class="header">
                <div class="search" style="font-family: Microsoft YaHei;
font-family: Microsoft YaHei;
	font-size: 1vw;
	font-weight: normal;
	font-stretch: normal;
	line-height: 2vw;
	letter-spacing: 0vw;
	color: #5783ff;
  display:flex;
   justify-content: center;
   align-items:center;">
                  对象相关信息: <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="
width: 11vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;
  margin-left:10px;
  
  "

      @search="onSearch"
    />
                </div>
                <div class="btn" >全部添加</div>
              </div>
              <div class="main">
                <a-table :columns="columns" :data-source="data" :pagination="{pageSize:4}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="start(1,record)" style="color:#45d793" v-if="1">添加 </a>
      <!-- <a @click="start(1,record)" style="color:#ffbb65">查看 </a> -->
      <a style="color:#dc5716" v-else>移除</a>
      </div>
    </template>
  </a-table>

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
    //查看题库
    function toDetail(record){
      console.log(record)
      router.push({path:'/tikuDetail',query:{key:record}})
      
    }
    //个人信息
    let message = reactive({
      name:'',
      mail:'',
      school:'',
      num:'',
      subjecta:'',
      arr:[]
    })
    //对话框
     const visible = ref(false);
     //添加对象flag
     let flag = ref(false)
    function start(i,record){
      if(i==0){
        flag.value  = true
      }
      else{
        flag.value = false
      }
      record
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
      title: '姓名',
      width: 100,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '学校',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
    {
      title: '专业班级',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
      {
      title: '学号',
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
    },]);
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
      message,
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
 flag
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
:global(.ant-modal-content){
  border-radius: 9px;
}

.add{
  :global(.ant-input-affix-wrapper .ant-input-suffix :not(.anticon)){
    color: #5783ff;;
  }
   .title{

    width: 180px;
	height: 40px;
	font-family: Microsoft YaHei;
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #5783ff;
  margin: auto;
  }
  .header{
    width: 96%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 30px;
    .btn:hover{
      cursor: pointer;
    }
    .btn{
      width: 7vw;
	height: 2vw;
	border-radius: 5px;
	border: solid 2px #51cc71;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-family: Microsoft YaHei;
	font-size: 1vw;
	font-weight: normal;
	font-stretch: normal;
	line-height: 2vw;
	letter-spacing: 0vw;
	color: #2ec255;
    }
  }
  .main{
        /deep/.ant-table-thead > tr:first-child > th{
          background-color:#f6f7fc ;
        }
  }

}
.edit {
   :global(  .ant-modal-footer  button:nth-child(2)){
          
width: 188px;
	height: 41px;
	background-color: #5783ff;
	border-radius: 8px;


      width: 100px;
     
      border-radius: 5px;
      }
}
.edit .message{
  position: relative;
  .title{

    width: 180px;
	height: 40px;
	font-family: Microsoft YaHei;
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #5783ff;
  margin: auto;
  }
   .main{
   display: flex;
   width: 95%;
   margin: auto;
   .left{
     width: 50%;
     height: 80%;
     div .name{
       width: 4vw;
	height: 2vw;
	font-family: Microsoft YaHei;
	font-size: 1vw;
	font-weight: normal;
	font-stretch: normal;
	line-height: 2vw;
	letter-spacing: 0vw;
	color: #5783ff;
     }
     

   }
   .right{
     margin-left: 60px;
     height: 80%;
     width: 50%;
     div .name{
       width: 2vw;
	height: 2vw;
	font-family: Microsoft YaHei;
	font-size: 1vw;
	font-weight: normal;
	font-stretch: normal;
	line-height: 2vw;
	letter-spacing: 0vw;
	color: #5783ff;
     }

   }

    }

  
   :global(.ant-modal-footer  button:nth-child(1)){
       display: none;
      }
      
    :global(.ant-modal-footer){
      display: flex;
      justify-content: center;
      button:nth-child(1){
       
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