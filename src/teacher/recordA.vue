<template>
    <div class="wra">
        <div class="header">
         
           
            <div :class="{'ing':1,'chosen':1}">成绩分析</div>
             <div class="btn"> <a-button type="primary" ghost @click="back">返回</a-button></div>
          
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
            <!-- <div class="bt"><a-button type="primary" style="
    border-radius: 4px;
    width: 100px;
     background-color:#5784ff;
" @click="start(0)">添加试题</a-button></div> -->
        </div>
        <div class="main">
         <a-list item-layout="vertical" size="large" :pagination="{pageSize: 3,}" :data-source="listData">
  
    <template #renderItem="{ item}">
      <a-list-item :key="item.title">
        <div class="item">
          <div class="problem">xxxxxxxxxxxxxxxxxxxxxxxx</div>
          <div class="answer">
            <div class="an">
              <div class="percent">10%</div>
              <div class="circle" style="width: 11px;
	height: 11px;
	background-color: #dc5716;
  border-radius:50%"></div>
              <div class="answerM">
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </div>
            </div>
          </div>

        </div>
   
      </a-list-item>
    </template>
  </a-list>
     

  
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
const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    
    title: `ant design vue part ${i}`,
   
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
export default defineComponent({
 
  
  setup() {
    //返回
    let back = ()=>{
      router.go(-1)
    }
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
      title: '题干',
      width: 100,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '题目类型',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
      align:'center'
     
    },
    {
      title: '所属题库',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
         align:'center'
     
    },
      {
      title: '查看权限',
      width: 100,
      dataIndex: 'age',
      key: 'age',
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
 listData,
 back
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
.wra{
    width: 98% !important;
    height: 95% !important;
  
    background-color: #eceff8;
    margin: auto;
    margin-top: 20px;
    .header{
        width: 95%;

        height: 7%;
        display: flex;
       font-family: Microsoft YaHei;
        justify-content: space-between;
        margin-left: 20px;
        align-items: center;
        font-size: 20px;
        margin-bottom: 10px;
        /deep/.ant-btn-background-ghost.ant-btn-primary{
        display: flex;
        justify-content: center;
        align-items: center;
	width: 17vh;
	height: 4vh;
	background-color: #5783ff !important;
	border-radius: 9px;
    font-family: Microsoft YaHei;
	font-size: 2vh;
	font-weight: normal;
	font-stretch: normal;
	line-height: 3vh;
	letter-spacing: 0vh;
	color: #ffffff;
        }
        .btn{
           
        }
        .chosen{
          color: #3a4167;
          font-weight: 500;
        }
        .myExam{
            font-family: Microsoft YaHei;
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
     

        .item{
          margin-left: -10px;
          width: 104%;
          height: 40%;
          background-color: #ffffff;
	border-radius: 5px;
  .problem{
    font-family: Source Han Sans SC;
	font-size: 25px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 36px;
	letter-spacing: 0px;
	color: #3a4167;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  }
  .answer{
    width: 90%;
    margin: auto;
    .an{
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .percent{
        margin-right: 10px;
	font-family: Source Han Sans SC;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 32px;
	letter-spacing: 0px;
	color: #dc5716;
      }
      .circle{
        margin-right: 10px;

      }
      .answerA{
        font-family: Source Han Sans SC;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 32px;
	letter-spacing: 0px;
	color: #3a4167;
      }
    }
  }
        }
        
    }
}

</style>