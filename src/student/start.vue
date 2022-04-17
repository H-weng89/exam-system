<template>
    <div class="wra">
        <div class="main">
            <div class="list">
                 <a-list item-layout="vertical" size="large" :pagination="{pageSize: 1,}" :data-source="bigProblem">
                    <template #renderItem="{item,index}">
      <a-list-item :key="index">
                <div class="big">       
                  <div class="header">
                    <div class="name" v-if="item.children" >
                         {{item.name}}
                    </div>
                 
                   
                  </div>
                   <div class="problem" v-for="(pro,key) in item.children"  :key="key">
                           <div class="problemName">
                                     {{key+1}}.{{pro.body}}
                           </div>
                           <div class="answer" v-if="pro.type=='选择题'">
                                <a-radio-group v-model:value="answer[0][key]">
    <a-radio :style="radioStyle" value="A">A.{{pro.a}}</a-radio>
    <a-radio :style="radioStyle" value="B">B.{{pro.b}}</a-radio>
    <a-radio :style="radioStyle" value="C">C.{{pro.c}}</a-radio>
    <a-radio :style="radioStyle" value="D">D.{{pro.d}}
      
    </a-radio>
  </a-radio-group>
                             <!-- <div> A.{{pro.a}}

                             </div>
                             <div>B.{{pro.b}}</div>
                             <div>C.{{pro.c}}</div>
                             <div>D.{{pro.d}}</div> -->
                           </div>
                           <div v-if="pro.type=='填空题'" style="margin-top:10px">
                                <a-input v-model:value="answer[1][key]" placeholder="Basic usage" />
                           </div>
                            <div v-if="pro.type=='大题'" style="margin-top:10px">
                                <a-textarea :rows="4" v-model:value="answer[2][key]" placeholder="Basic usage" />
                           </div>
                   </div>
                </div>
      </a-list-item>
                    </template>
                 </a-list>
              </div>

              <div class="btn">
                     <a-button type="primary" ghost @click="end" >提交</a-button>
              </div>
          
             
        </div>
        
    </div>
</template>

<script>
import { defineComponent,ref,onMounted } from 'vue';
import {useRoute,useRouter} from 'vue-router'
import api from '../api/axios'
import { message } from 'ant-design-vue';
export default defineComponent({
  setup() {
       let bigProblem = ref([])
          let route = useRoute()
          let router = useRouter()
       let answer =ref([[],[],[]])

       let examId = ref('')

       onMounted(async ()=>{
           let record = JSON.parse( route.query.exam)
           console.log(record)
           let id = record.examPaperID
           console.log(id)
           examId.value = record.id

           let result = await api.getPaperS(id)
           let body = JSON.parse( result.data.data.body)
           console.log(body)
           for(let i = 0;i<body.length-2;i++){
               bigProblem.value.push(body[i])
           }
        //    let choose = body[0].children
        //    let chooseList =[]
        //    function sort(arr,list){
        //        if(arr.length>5){
        //            let item  = arr.splice(0,5)
        //            let obj = {children:item,name:body[0].name}
                   
        //            list.push(item)
        //            if(arr.length>5){
        //                sort(arr,list)
        //            }
        //            else{list.push(arr)}
        //        }
        //       return list
        //    }
        //                 chooseList =   sort(choose,chooseList)
        //                chooseList.forEach(item=>{
        //                    bigProblem.value.push(item)
        //                })
        //                for(let i = 1;i<=2;i++){
        //                    bigProblem.value.push(body[i])
        //                }
        //                console.log(bigProblem.value)
            

        
       


       })

       let end = async ()=>{
         let answer2 = answer.value
        
         let ans = []
         bigProblem.value.forEach(item=>{
             let s = []
                item.children.forEach(i=>{
                    let obj = {score:'',
                    ans:i.ans}
                    if(i.type=='选择题'||i.type=='填空题'){
                        obj.score = 2
                    }
                    else{
                        obj.body = i.body
                        obj.score = 20
                    }
                   
                    s.push(obj)
                })
                // s = JSON.stringify(s)
                ans.push(s)

         })
         answer2.push(ans)
         console.log(answer2)
          let data = {
             examPaper:JSON.stringify(answer2),
             examID:examId.value
         }

         let result = await api.submit(data)
  message.success(result.data.msg)
  router.go(-1)
    


           
       }

    return {
        answer,
        end,

       bigProblem
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
    .main{
        margin: auto;
        width: 98%;
	height: 83vh;
	background-color: #ffffff;
	border-radius: 1vh;

    .list{
        /deep/.ant-list{
            width: 98%;
        }
        width: 98%;
        margin: auto;
        display: flex;
        height: 90%;
        justify-content: flex-start;

        .big{
            height: 550px;
                overflow: auto;
           .header{
               display: flex;
               justify-content: flex-start;

           }
           .problem{
               margin-bottom: 10px;
               .problemName{
    display: flex;
               justify-content: flex-start;
               }
            
           }
           .answer{
               /deep/.ant-radio-group{
                       display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
               }
             display: flex;
             flex-direction: column;
             justify-content: flex-start;
             align-items: flex-start;
          

           }

        }

    }
    
}

.btn{
      position: absolute;
  bottom: 8%;
  left: 55%;
  transform: translate(-50%,0);
   margin: auto;
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