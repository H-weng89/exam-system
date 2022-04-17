<template>
 
          <div class="wra">
        <div class="header">
            <div class="myExam">批改试卷</div>
            <div class="btn"> <a-button type="primary" ghost @click="back(3)">返回</a-button></div>
           
           
        </div>
        <div class="step">
             <a-steps v-model:current="current" type="navigation" :style="stepStyle" @change="change">
      <a-step status="process" v-for="(item,index) in problem" :key="index"></a-step>
      <!-- <a-step status="process" title="Step 2" />
      <a-step status="wait" title="Step 3" />
      <a-step status="wait" title="Step 4" /> -->
    </a-steps>
        </div>

        <div class="main">
          <div class="body">{{body}}</div>
           <a-divider >学生答案</a-divider>
          <div class="ans">{{ansS}}</div>
                    <a-divider >答案</a-divider>
          <div class="answer">{{ans}}</div>

        </div>
        <div class="record">
            <a-input v-model:value="form.recordList[current]" placeholder="输入该题分数" style="
            font-weight: normal;
	font-stretch: normal;
	line-height: 25px;
	letter-spacing: 0px;
	color: #5783ff;
    text-align:center;
	
    " />
        </div>
        <div class="footer">
             <div class="btn"> <a-button type="primary" ghost @click="back(1)">上一题</a-button></div>
              <div class="btn"> <a-button type="primary" ghost @click="end">确定</a-button></div>
               <div class="btn"> <a-button type="primary" ghost @click="back(2)">下一题</a-button></div>
        </div>
       
        
      
       
          </div>
</template>
<script>
import { defineComponent, reactive,ref,onMounted,watch } from 'vue';
import {useRouter,useRoute} from 'vue-router'
 import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
 import moment from 'moment';
 import api from '../api/axios'
  import 'moment/dist/locale/zh-cn';
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    //试卷数据
        let data = ref([])
 let route = useRoute()
 let points = ref(0)
 let problem = ref([])
 let body = ref('')
 let ans = ref('')
 let id = ref('')
 let uid = ref('')
 let exampaper = ref('')
 let ansS = ref('')


    //添加试卷和添加对象
    let  flag = ref(false)  //1添加试卷 2添加对象
    let visible = ref(false)
    onMounted(()=>{
      
         let main = JSON.parse(route.query.main)
         exampaper.value = route.query.main
         let other = JSON.parse(route.query.other)
         id.value = other.id
         uid.value = other.uid
         console.log(other)

         console.log(main)
          let answer = main[3]
          
          answer.forEach((item,key1)=>{
            item.forEach((ans,key2)=>{
              if(ans.score==2){
                 let  result = ans.ans.toUpperCase()
                  let sresult = main[key1][key2]

                   if(result==sresult){
                     points.value+=2
                   }
              }
              else{
                 let obj = ans
                 obj.point = 0
                 obj.ansS = main[key1][key2]
                
                 problem.value.push(obj)

              }

            })
                       
          })

          console.log(points.value,problem.value)

          body.value = problem.value[0].body
          ans.value  = problem.value[0].ans
          ansS.value = problem.value[0].ansS

           message.info('选择填空分数已计算:'+points.value+'分')
          
    })
    let add = (i)=>{
      visible.value = true
      if(i==1){
        
        flag.value = true

      }
      else{
        flag.value = false
      }


    }
      let router = useRouter() 
      let back = (i)=>{

        if(i==3){

        
       router.go(-1)}
           
       if(i==1){ 
                if(current.value==0){
                  return
                }
         current.value--
       }
       if(i==2){
         if(current.value==2){
           return
         }
         current.value++
       }
      }
    //   let route = useRoute()
moment.locale('zh-cn')
    let form = reactive({
        name:'',
        time:moment('2015-01-01', 'YYYY-MM-DD'),
        pass:'',
        messageTime:'',
        startTime:'',
        publicTime:'',
        num:'',
        exam:'',
        endTime:'',
        answerTime:'',
        latestTime:'',
        group:'',
        other:'',
        recordList:[],
        examList:[ {
        value: 'jack',
        label: 'Jack (100)',
      },],
       groupList:[ {
        value: 'jack',
        label: 'Jack (100)',
      },],
       roleList:[ {
        value: 'jack',
        label: 'Jack (100)',
      },]
    })
    let current = ref(0)
    watch(current,(newv)=>{
     body.value = problem.value[newv].body
       ans.value = problem.value[newv].ans
       ansS.value = problem.value[newv].ansS
    })
    let change = (cu)=>{
       body.value = problem.value[cu].body
       ans.value = problem.value[cu].ans
       ansS.value = problem.value[cu].ansS
    }

    let end =async ()=>{
           form.recordList.forEach(item=>{
            
             points.value+=parseInt(item)
           })

  let data = {
    examID:id.value,
    
    points:points.value,
    uid:uid.value
  }
  let result = await api.check(data )
   message.info(result.data.msg)
   router.go(-1)

           
            
           
    }

    return {
        form,
        locale,
        back,
        add,
        flag,
        visible,
        current,
     problem,
        data,
        change,
        body,
        ans,
        end,
        ansS
     
     
    };
  },
});
</script>
<style lang="less" scoped>
 :global(.ant-modal-footer  button:nth-child(1)){
       display: none;
      }
      
    :global(.ant-modal-footer){
      display: flex;
      justify-content: center;
      button:nth-child(1){
       
      }
   
      
    }
     :global(  .ant-modal-footer  button:nth-child(2)){
          
width: 188px;
	height: 41px;
	background-color: #5783ff;
	border-radius: 8px;


      width: 100px;
     
      border-radius: 5px;
      }

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


.step{
    

}
 .main{
     width: 83vh;
	height: 43vh;
	background-color: #ffffff;
	border-radius: 10px;
	border: solid 1px #3a4167;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-40%,-50%);

    .body{
      margin-top: 20px;
      font-size: 16px;
    }
    .ans{
      margin-top: 20px;
      font-size: 16px;
    }
    .answer{
      margin-top: 20px;
      font-size: 16px;
    }
 }
 .record{
width: 320px;
	height: 47px;
	
	border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 77%;
    transform: translate(-35%,-50%);
    input::-webkit-input-placeholder {
            text-align: center;
            font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 31px;
	letter-spacing: 0px;
	color: #5783ff;
        }
    
 }
 div.footer{
     width: 80%;
     display: flex;
     justify-content: space-around;
     position: absolute;
     bottom: 15%;
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
 }
   
 
}


</style>