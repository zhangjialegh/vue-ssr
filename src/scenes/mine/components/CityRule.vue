<template>
   <div>
      <div class="mine-title">合伙人奖励机制</div>
      <div class="city_rule_wrapper">
        <div class="city_rule_item">
          <h3>+1%</h3>
          <p>
            成功邀请用户投资，<br/>额度的1%将作为你的专属奖励
          </p>
        </div>
        <div class="city_rule_item">
          <h3>+0.5%</h3>
          <p>
             被邀请的投资用户二次邀请<br/>投资将额外增加0.5%的奖励
          </p>
        </div>
        <div class="city_rule_item">
          <h3>$$$</h3>
          <p>
            按照邀请投资用户资金到账时间,<br/>实时结算到你的余额账户
          </p>
        </div>
      </div>
      <div class="mine-title" style="margin-top:20px">规则案例</div>
      <table border="1" class="city_rule_list">
        <tr>
          <td></td>
          <td>A获得</td>
          <td>B获得</td>
          <td>C获得</td>
        </tr>
        <tr>
          <td>A邀B</td>
          <td>1%</td>
          <td>/</td>
          <td>/</td>
        </tr>
        <tr>
          <td>B邀C</td>
          <td>0.5%</td>
          <td>1%</td>
          <td>/</td>
        </tr>
        <tr>
          <td>C邀D</td>
          <td>/</td>
          <td>0.5%</td>
          <td>1%</td>
        </tr>
      </table>
    </div>
</template>

<script>

export default {
  name: 'cityInvite'
}
</script>

<style lang="scss" scoped>
.city_rule_wrapper {
  border: 1px solid #E9E9E9;
  background-color: #fff;
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #000;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  .city_rule_item {
    flex: 1;
    text-align: center;
    @media (max-width: 479px) {
      font-size: 13px;
    }
  }
}
.city_rule_list {
  background-color: #fff;
  width: 100%;
  border: 1px solid #E9E9E9;
  color: #000;
  font-size: 13px;
  td {
    width: 25%;
    padding: 10px 0;
    text-align: center;
  }
}
</style>
