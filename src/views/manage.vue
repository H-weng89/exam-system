<template>
    <div class="wra">
        <!-- <div class="header">
            <div class="logo"></div>
            <div class="right">
                <div class="name">xxx,你好</div>
                <div class="icon">
    <bell-outlined :style="{fontSize:'20px'}" />
    <user-outlined :style="{fontSize:'20px'}" />
                </div>
            </div>
        </div> -->
        <header1></header1>
        <div class="main">
  <div class="left">
              <a-menu
      v-model:selectedKeys="selectedKeys"
      style="width: 100%;background-color:#3a4167"
      mode="inline"
      :open-keys="openKeys"
      @openChange="onOpenChange"
      theme="dark"
       @click="change"
      
    >
      
      <!-- <a-sub-menu key="sub1">
        <template #icon>
          
          <img src="../assets/yiku.png" alt=""  style="width:20px">
        </template>
        <template #title>用户管理</template>
        <a-menu-item key="2"><span class="circle" style="margin-right:10px">学生管理</span>试题管理</a-menu-item>
        <a-menu-item key="3"><span class="circle"></span>教师管理</a-menu-item>
        

      </a-sub-menu> -->
        <a-sub-menu key="sub2">
        <template #icon>
     <img src="../assets/exam.png" alt=""  style="width:20px">
        </template>
        <template #title>用户管理</template>
        <a-menu-item key="4"><span class="circle"></span>学生管理</a-menu-item>
        <a-menu-item key="5"><span class="circle"></span>教师管理</a-menu-item>
        

      </a-sub-menu>
        <a-menu-item key="6">
        <template #icon>
        <img src="../assets/check.png" alt=""  style="width:20px">
        </template>
 系统管理
      </a-menu-item>    
     
      <a-menu-item key="8">
        <template #icon>
          <AppstoreOutlined/>
        </template>
     通知
      </a-menu-item>   
          <!-- <a-menu-item key="9">
        <template #icon>
          <AppstoreOutlined/>
        </template>
     考生管理
      </a-menu-item>   
    
        <a-sub-menu key="sub3">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>通知</template>
        <a-menu-item key="10"><span class="circle"></span>全部通知</a-menu-item>
        <a-menu-item key="11"><span class="circle"></span>系统通知</a-menu-item>
        

      </a-sub-menu> -->
      
 
    </a-menu>

        </div>
        <div class="right">
          <router-view></router-view>
        </div>
        </div>
         
    
        
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import { defineComponent,reactive,toRefs } from 'vue';
import header1 from '../components/header.vue'
import { AppstoreOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
 header1,
  
AppstoreOutlined,
    
  },
  setup() {
    let router = useRouter()
    //导航栏
    const state = reactive({
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      selectedKeys: [],
    });

    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);

      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    //点击导航栏
    function change(item){
     
      if(item.key==4){
        router.push('/manage/student')
      }
      if(item.key==5){
        router.push('/manage/teacher')
      }
      if(item.key==8){
        router.push('/manage/message')
      }
      if(item.key ==6){
        router.push('/system')
      }
     

    }

    return { ...toRefs(state),
      onOpenChange,
      change
    };
  },
});
</script>

<style lang="less" scoped>
.wra{
    width: 100vw;
    height: 100vh;
    .main{
      width: 100%;
      height: 92%;
      display: flex;
    }
   
    .left{
        width: 14%;
        height: 100%;
        background-color: #3a4167;
        img{
          width: 25px;
          height: 20px;
        }
 
        /deep/.ant-menu-sub.ant-menu-inline{
            background-color: #3a4167 !important;
        }
        .circle{
          
            width: 7px;
            height: 7px;
            background-color: white;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
            // background-color: gray;
            background-image: url(../assets/椭圆.png);
        }
      /deep/ .ant-menu-submenu-title .ant-menu-item-icon + span{
        margin-left: 30px;
      }
      /deep/.ant-menu-item .ant-menu-item-icon + span{
        margin-left: 30px;
      }
      /deep/ .ant-menu-dark.ant-menu-inline .ant-menu-item{
       
      }
        /deed/ .ant-menu-inline.ant-menu-root .ant-menu-submenu-title > .ant-menu-title-content{
          margin-left: 30px !important;
          
        }
    }
    .right{
      width: 95%;
      height: 100%;
      background-color: #eceff8;
      margin: auto;
     
      
      
    }
   
}

</style>