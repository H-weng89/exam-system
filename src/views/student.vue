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
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>考试</template>
     
        <a-menu-item key="2"><span class="circle"></span>进行中</a-menu-item>
        <a-menu-item key="3"><span class="circle"></span>已结束</a-menu-item>

      </a-sub-menu>
       
    </a-menu>

        </div>
        <div class="right">
          <router-view v-if="flag"></router-view>
        </div>
        </div>
         
    
        
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs,ref } from 'vue';
import header1 from '../components/header.vue'
import {useRouter} from 'vue-router'
import { MailOutlined, } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
 header1,
  MailOutlined,

  },
  setup() {
    //路由
    let flag = ref(true)
    const router = useRouter()
   
    //导航栏
    const state = reactive({
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      selectedKeys: [],
    });
//子菜单
    const onOpenChange = openKeys => {
      
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);

      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    //点击菜单
    const change = (item)=>{
      flag.value = false
      if(item.key<=3){
        flag.value = true
  router.push({path:'/exam',query:{key:item.key}})
 
    }
    if(item.key==4){
      flag.value = true
      router.push('/person')
    }
    if(item.key>4){
      flag.value = true
      router.push({path:'/message',query:{key:item.key}})
    }
      }
  

    return { ...toRefs(state),
      onOpenChange,
      change,
      flag
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
        /deep/.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected{
            
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