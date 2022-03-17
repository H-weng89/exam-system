<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">消息通知</div>
           
            <div :class="{'ing':1,'chosen':key==5}">考试通知</div>
            <div :class="{'end':1,'chosen':key==6}">系统通知</div>
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
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}">
    <!-- <template #action>
      <a>进入考试</a>
    </template> -->
  </a-table>
         

  
        </div>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate} from 'vue-router'
import { defineComponent, ref,onMounted} from 'vue';
export default defineComponent({
 
  
  setup() {
    //判断
    let route = useRoute()
    let key = ref(route.query.key)
onBeforeRouteUpdate(to => {
     key.value = to.query.key
});
    onMounted(()=>{
      //根据key获取数据
      key.value = route.query.key
    })
   const columns = ref([{
      title: '具体内容',
      width: 600,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    }, {
      title: '发布者',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    }, {
      title: '发布时间',
      dataIndex: 'address',
      key: '1',
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
 data,
 columns,
 key
    
 
 
    
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
        justify-content: flex-start;
        margin-left: 25px;
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