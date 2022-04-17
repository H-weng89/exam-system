<template>
    <div class="wra">
        <div class="header">
            <!-- <div class="myExam">消息同通知</div> -->
           
            <div :class="{'ing':1,'chosen':1}">全部通知</div>
            <!-- <div :class="{'end':1,}">系统通知</div> -->
        </div>
        <div class="second">
          
            <div class="search">
                 消息内容：<a-input-search
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
" @click="start(1)">发布通知</a-button></div>
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="toDetail(record)"> 查看 </a>
      <a @click="start(1)">编辑 </a>
      <a>删除</a>
      </div>
     
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible"  @ok="handleOk" cancelText="取消" okText="确定发布" height="58%" width="46%" >
           <div class="create">
           
             <div class="title">发布通知</div>
             <div class="main">
               <div class="name">具体消息</div>
               <a-textarea v-model:value="message" placeholder="Basic usage" :rows="4"  style=" width: 100%;
	height: 19vh;
 
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;"/>
             </div>
             <div class="foot">
              
                <div class="item">
                      <div class="name">考试对象</div>
                      <a-input-search
      v-model:value="group"
      placeholder="input search text"
      style="width:270px;
      border-radius:5px;
      
      "
      
      
    
      @search="add(1)"
    >
      <template #enterButton>
      <a-button>
        +
      </a-button>

       
      
      
      </template>
    </a-input-search>

                     
                     
                    </div>


             </div>
           </div>
    </a-modal>
     <a-modal v-model:visible="visible1"  @ok="handleOk" cancelText="取消" okText="确定"   width="56%" height="40%" className = "model" >
          
           <div class="add" >
              <div class="title">
                添加试卷
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
                  试卷名称: <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="
width: 11vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
  margin-left:10px;
  
  "

      @search="onSearch"
    />
                </div>
                <div class="btn" >全部添加</div>
              </div>
              <div class="main">
                <a-table :columns="columns2" :data-source="data" :pagination="{pageSize:5}"  rowKey="account">
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
import { defineComponent, ref,onMounted} from 'vue';
export default defineComponent({
 
  
  setup() {
    //查看题库
    function toDetail(record){
      console.log(record)
      router.push({path:'/tikuDetail',query:{key:record}})
      
    }
    //添加对象
    let visible1 = ref(false)
    let add = (i)=>{
      if(i==1){
        visible1.value = true
      }
    }
    //对话框
    //消息
    let group = ref('')
    let message = ref('')
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
      title: '具体通知',
      width: 200,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '发布者',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
    {
      title: '发布时间',
      width: 50,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
       ]);
        const columns2 = ref([{
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
     
    },{
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
 message,
 group,
 visible1,
 add,
 columns2
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
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
.create{
  
  // :global(.ant-btn){
  //   height: 34px;
  //   border: 2px solid #5783ff;
  // }
    
   :global(.ant-modal-footer  button:nth-child(1)){
       display: none;
      }
        :global(.ant-modal-footer  button:nth-child(2)){
width: 188px;
	height: 41px;
	background-color: #5783ff;
	border-radius: 8px;

      width: 100px;
      margin: auto;
     
      border-radius: 5px;
      }
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
     display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    margin: auto;
    .name{
      font-family: Microsoft YaHei;
	font-size: 2vh;
	font-weight: normal;
	font-stretch: normal;
	line-height: 3vh;
	letter-spacing: 0vh;
	color: #5783ff;
    }
    .detail{
      width: 100%;
	height: 19vh;
 
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;
    }
    margin-bottom: 40px;
  }
  .foot{
    margin-top: 100px;
    width: 90%;
     display: flex;
     margin: auto;
     /deep/.ant-input{
     border:  2px solid #5783ff;
     border-right: 0;
     }
     /deep/.ant-btn{
        height: 34px;
    border: 2px solid #5783ff;
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