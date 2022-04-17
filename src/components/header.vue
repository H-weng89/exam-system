<template>
     <div class="header">
            <div class="logo">
                <div class="first"><img src="../assets/logo.svg" alt=""></div>
                <div class="second">废物废物废物</div>
            </div>
            <div class="right">
                <div class="message" @click="toMessage">
                    <img src="../assets/消息通知.png" alt="" style="width:25px">
                    <div class="title">消息通知</div>
                    
                </div>
                <div class="name">
                      <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
        <div class="item">
             <img src="../assets/用户.png" alt="" style="width:25px">

                    <div class="title">你好!</div>
        </div>
    
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;" @click="toPerson">个人中心</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:; " @click="home">退出</a>
        </a-menu-item>
  
      </a-menu>
    </template>
  </a-dropdown>
                    
                </div>
                <!-- <div class="icon">
    <bell-outlined :style="{fontSize:'20px'}" />
    <user-outlined :style="{fontSize:'20px'}" />
                </div> -->
            </div>
        </div>
</template>

<script>
import { defineComponent,} from 'vue';
import { message } from 'ant-design-vue';
import {useRouter,} from 'vue-router'
export default defineComponent({
  components: {
   
  },

  setup(){
      let router = useRouter()
      let toPerson = ()=>{
           message.info('此功能暂未开放')


      }
    
    
      
        let home = ()=>{
            console.log(1)
            router.push('/')
        }
      let toMessage = ()=>{
             message.info('此功能暂未开放')
             return
       
      }



      return{
          toPerson,
          toMessage,
          home
      }
  }
});
</script>


<style lang="less" scoped>
.first{
     img{
         width: 60px;
     }
}
.ant-dropdown{
    a{
        color: #3a4167;
    }
}
    .header{
        height: 8%;
        width: 100vw;
        background-color: white;
        display: flex;
        align-items: center;
       
        justify-content: space-between;
      
    
        
        .logo{
            height: 100%;
            width: 12.85%;
            display: flex;
            color: white;
            font-size: 20px;
            align-items: center;
            justify-content: space-around;

           
            background-color: #3a4167;
        }
        .right{
            display: flex;
            width: 30%;
            height: 100%;
            align-items: center;
            justify-content: space-around;

            .message:hover{
                cursor: pointer;
            }
            .message{
             
                display: flex;
                align-items: center;
                color: #3a4176;
                font-size: 16px;
                .title{
  margin-left: 5px;
                }
              
            }
            .name{
               display: flex;
           
                font-size: 16px;
                align-items: center;
                color: #3a4176;
                .item{
                    display: flex;
                    align-items: center;
                    color: #3a4176;
                font-size: 16px;
             
                }
                .title{
                    margin-left: 5px;
                }
            }
            .icon{
                flex: 1;
                display: flex;
                justify-content: space-around;
            }
        }
    }

</style>