<template>
    <div class="w-container page-content">
        <h1 class="page-title">{{$t('华美银行开户服务')}}</h1>
        <div class="alert">
            <p class="imp-text">{{$t('为了提高银行的审核通过率')}}</p>
        </div>
        <form id="form-bankinfo" @submit.prevent="validateBeforeSubmit">
    
            <fieldset>
                <legend>{{$t('证件资料')}}</legend>
                <div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label>{{$t('护照首页电子照片')}}<span class="red-text">*</span></label>
                            <div>
                                <p class="desc">{{$t('护照带有照片头像')}}</p>
                                <div id="upload" class="upload-warp">
                                    <input type="hidden" v-model="imageURL" v-validate="'required'" name="imageURL"/>
                                    <img v-bind:src="imageURL" alt="" srcset="">
                                    <div class="img-progress">
                                        <div class="progress-step" v-bind:style="{ height: progressHeight + '%' }"></div>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.has('imageURL')" class="error">{{ errors.first('imageURL') }}</span>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="mobile">{{$t('姓名')}}<span class="red-text">*</span></label>
                            <div class="w-row">
                                <div class="w-col w-col-6">
                                    <input type="text" v-model="last_name" v-validate="'required'" name="last_name" class="input w-input" :placeholder="$t('请输入您的姓氏')" />
                                </div>
                                <div class="w-col w-col-6">
                                    <input type="text" v-model="first_name" v-validate="'required'" name="first_name" class="input w-input" :placeholder="$t('请输入您的名字')" />
                                </div>
                            </div>
                            <span v-if="errors.has('last_name')" class="error">{{ errors.first('last_name') }}</span>
                            <span v-if="errors.has('first_name')" class="error">{{ errors.first('first_name') }}</span>
                        </div>
                        <!-- <div class="w-col w-col-6">
                            <label for="email">性别<span class="red-text">*</span></label>
                            <div class="radio">
                                <label class="radio-inline"> <input type="radio" name="gender" id=""> 先生</label>
                                <label class="radio-inline"><input type="radio" name="gender" id=""> 女士</label>
                            </div>
                        </div> -->
                        <div class="w-col w-col-6">
                            <label for="gender">{{$t('性别')}}<span class="red-text">*</span></label>
                            <div>
                                <select class="input w-input" v-model="gender" v-validate="'required'" name="gender">
                                    <option value="0">{{$t('先生')}}</option>
                                    <option value="1">{{$t('女士')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="birthday">{{$t('出生日期')}}<span class="red-text">*</span></label>
                            <datepicker type="text" name="birthday" v-model="birthday" v-validate="'required'" :format="'yyyy-MM-dd'" :language="zh" class="input w-input datepicker" :placeholder="$t('请选择您的出生日期')" />
                            <span v-if="errors.has('birthday')" class="error">{{ errors.first('birthday') }}</span>
                        </div>
                        <div class="w-col w-col-6">
                            <label for="birthplace">{{$t('出生地')}}<span class="red-text">*</span></label>
                            <input type="text" name="birthplace" v-model="birthplace" v-validate="'required'" class="input w-input" :placeholder="$t('请输入您的出生地')" />
                            <span v-if="errors.has('birthplace')" class="error">{{ errors.first('birthplace') }}</span>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="idCard">{{$t('中国身份证号')}}<span class="red-text">*</span></label>
                            <input type="text" name="idCard" v-model="idCard" v-validate="'required'" class="input w-input" :placeholder="$t('请输入您在中国的居民身份证号码')" />
                            <span v-if="errors.has('idCard')" class="error">{{ errors.first('idCard') }}</span>

                        </div>
                        <div class="w-col w-col-6">
                            <label for="motherLast">{{$t('母亲姓氏')}}<span class="red-text">*</span></label>
                            <input type="text" name="motherLast" v-model="motherLast"  v-validate="'required'" class="input w-input" :placeholder="$t('请输入您母亲的姓氏')" />
                            <span v-if="errors.has('motherLast')" class="error">{{ errors.first('motherLast') }}</span>

                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="passport">{{$t('护照号码')}}<span class="red-text">*</span></label>
                            <input type="text" name="passport" v-model="passport" v-validate="'required'" class="input w-input" :placeholder="$t('请输入9位护照号码')" />
                            <span v-if="errors.has('passport')" class="error">{{ errors.first('passport') }}</span>
                        </div>
                        <div class="w-col w-col-6">
                            <label for="passportPlace">{{$t('护照签发地')}}<span class="red-text">*</span></label>
                            <input type="text" name="passportPlace" v-model="passportPlace" v-validate="'required'" class="input w-input" :placeholder="$t('请输入护照签发地')" />
                            <span v-if="errors.has('passportPlace')" class="error">{{ errors.first('passportPlace') }}</span>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="issueDate">{{$t('签发日期')}}<span class="red-text">*</span></label>
                            <datepicker type="text" name="issueDate" v-model="issueDate" v-validate="'required'" :format="'yyyy-MM-dd'" :language="zh" class="input w-input datepicker" :placeholder="$t('选择护照签发日期')" />
                            <span v-if="errors.has('issueDate')" class="error">{{ errors.first('issueDate') }}</span>
                        </div>
                        <div class="w-col w-col-6">
                            <label for="expireDate">{{$t('护照到期日期')}}<span class="red-text">*</span></label>
                            <datepicker type="text" name="expireDate" v-model="expireDate" v-validate="'required'" :format="'yyyy-MM-dd'" :language="zh" class="input w-input datepicker" :placeholder="$t('选择护照的到期时间')" />
                            <span v-if="errors.has('expireDate')" class="error">{{ errors.first('expireDate') }}</span>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>{{$t('联系方式')}}</legend>
                <div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="phone">{{$t('手机号码请留意')}}<span class="red-text">*</span></label>
                            <div class="w-row">
                                <div class="w-col w-col-4">
                                    <select class="input w-input" v-model="country" v-validate="'required'" name="country" value="86">
                                        <option value="86">{{$t('中国86')}}</option>
                                    </select>
                                </div>
                                <div class="w-col w-col-8">
                                    <input type="text" name="phone" v-model="phone" v-validate="'required'" class="input w-input" :placeholder="$t('请输入您的手机号码')" />
                                </div>
                            </div>
                            <span v-if="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
                        </div>
                        <div class="w-col w-col-6">
                            <label for="email">{{$t('电子邮箱')}}<span class="red-text">*</span></label>
                            <input type="text" name="email" v-model="email" v-validate="'required|email'" class="input w-input" :placeholder="$t('请输入您的电子邮箱')" />
                            <span v-if="errors.has('email')" class="error">{{ errors.first('email') }}</span>

                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col">
                            <label for="homeAddress">{{$t('家庭住址')}}<span class="red-text">*</span></label>
                            <input type="text" name="homeAddress" v-model="homeAddress" v-validate="'required'" class="input w-input" :placeholder="$t('请输入您的家庭住址')" />
                            <span v-if="errors.has('homeAddress')" class="error">{{ errors.first('homeAddress') }}</span>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col">
                            <label for="mailingAddress">{{$t('邮寄地址')}}<span class="red-text">*</span></label>
                            <input type="text" name="mailingAddress" v-model="mailingAddress" v-validate="'required'" class="input w-input" :placeholder="$t('请输入您的邮寄地址')" />
                            <span v-if="errors.has('mailingAddress')" class="error">{{ errors.first('mailingAddress') }}</span>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>{{$t('其他')}}</legend>
                <div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="workPlace">{{$t('就职单位')}}<span class="red-text">*</span></label>
                            <input type="text" name="workPlace" v-model="workPlace" v-validate="'required'" class="input w-input" :placeholder="$t('请输入公司与职衔名称')" />
                            <span v-if="errors.has('workPlace')" class="error">{{ errors.first('workPlace') }}</span>
                        </div>
                        <div class="w-col w-col-6">
                            <label for="industry">{{$t('行业类型')}}<span class="red-text">*</span></label>
                            <select class="input w-input" v-model="industry" v-validate="'required'" name="industry" id="">
                                <option  v-for="item in industryList" :key="item" :value="item">{{item}}</option>
                            </select>
                            <span v-if="errors.has('industry')" class="error">{{ errors.first('industry') }}</span>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="jobTitle">{{$t('工作职称')}}<span class="red-text">*</span></label>
                            <input type="text" name="jobTitle" v-model="jobTitle" v-validate="'required'" class="input w-input" :placeholder="$t('请输入您的工作职称')" />
                            <span v-if="errors.has('jobTitle')" class="error">{{ errors.first('jobTitle') }}</span>
                        </div>
                        <div class="w-col w-col-6">
                            <label for="taxNumber">{{$t('报税识别号码')}}<span class="red-text">*</span></label>
                            <input type="text" name="taxNumber" v-model="taxNumber" v-validate="'required'" class="input w-input" :placeholder="$t('输入您的报税识别号码')" />
                            <span v-if="errors.has('taxNumber')" class="error">{{ errors.first('taxNumber') }}</span>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="isAmerican">{{$t('您是美国的永久居民吗')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="isAmerican" name="isAmerican" type="radio" value="1">{{$t('是')}}</label>
                                <label class="checkbox-inline"><input v-model="isAmerican" name="isAmerican" type="radio" value="0">{{$t('否')}}</label>
                                <input v-if="isAmerican=='0'" type="text" name="liveCountry" v-model="liveCountry" v-validate="'required'" class="input w-input" :placeholder="$t('请填写居住国家')" />
                                <span v-if="errors.has('liveCountry')" class="error">{{ errors.first('liveCountry') }}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="witchCountryPeople">{{$t('您是哪些国家的公民')}}<span class="red-text">*</span></label>
                            <div>
                                <input type="text" name="witchCountryPeople" v-model="witchCountryPeople" v-validate="'required'" class="input w-input" :placeholder="$t('请列出所有国家')" />
                                <span v-if="errors.has('witchCountryPeople')" class="error">{{ errors.first('witchCountryPeople') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="transferWithGuba">{{$t('您未来是否预期与古巴')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="transferWithGuba" name="transferWithGuba"  type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="transferWithGuba" name="transferWithGuba" type="radio" value="1">{{$t('是')}}</label>
                                <input v-if="transferWithGuba=='1'" type="text" name="transferCountry" v-model="transferCountry" v-validate="'required'" class="input w-input" :placeholder="$t('填写资金来往的国家')" />
                                <span v-if="errors.has('transferCountry')" class="error">{{ errors.first('transferCountry') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="hasEstateInGuba">{{$t('您是否在古巴经营业务')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="hasEstateInGuba" name="hasEstateInGuba"  type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="hasEstateInGuba" name="hasEstateInGuba" type="radio" value="1">{{$t('是')}}</label>
                                <input v-if="hasEstateInGuba=='1'" type="text" name="hasEstateCountry" v-model="hasEstateCountry" v-validate="'required'" class="input w-input" :placeholder="$t('填写所在的国家')" />
                                <span v-if="errors.has('hasEstateCountry')" class="error">{{ errors.first('hasEstateCountry') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="purposeForNewAccount">{{$t('新账户的主要用途是什么')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="purposeForNewAccount" name="purposeForNewAccount" type="radio" value="1">{{$t('家用')}}</label>
                                <label class="checkbox-inline"><input v-model="purposeForNewAccount" name="purposeForNewAccount" type="radio" value="2">{{$t('储蓄')}}</label>
                                <label class="checkbox-inline"><input v-model="purposeForNewAccount" name="purposeForNewAccount"  type="radio" value="3">{{$t('投资')}}</label>
                                <label class="checkbox-inline"><input v-model="purposeForNewAccount" name="purposeForNewAccount" type="radio" value="4">{{$t('其他')}}</label>
                                <input v-if="purposeForNewAccount=='4'" type="text" name="otherPurpose" v-model="otherPurpose" v-validate="'required'" class="input w-input" :placeholder="$t('其他用途')" />
                                <span v-if="errors.has('otherPurpose')" class="error">{{ errors.first('otherPurpose') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="incomeType">{{$t('您的财富来源有哪些')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="1">{{$t('工作收入')}}</label>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="2">{{$t('投资')}}</label>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="3">{{$t('个人储蓄')}}</label>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="4">{{$t('资产出售')}}</label>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="5">{{$t('理赔')}}</label>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="6">{{$t('家庭资助')}}</label>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="7">{{$t('继承')}}</label>
                                <label class="checkbox-inline"><input type="checkbox" v-model="incomeType" name="incomeType" value="8">{{$t('其他')}}</label>
                                <input v-if="incomeType.indexOf('8')>-1" type="text" name="otherIncomeType" v-model="otherIncomeType" v-validate="'required'" class="input w-input" :placeholder="$t('其他财富来源')" />
                            </div>
                            <span v-if="errors.has('otherIncomeType')" class="error">{{ errors.first('otherIncomeType') }}</span>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="isOfficerEver">{{$t('您是否担任或曾经担任政府高级官员')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="isOfficerEver" name="isOfficerEver" checked="checked" type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="isOfficerEver" name="isOfficerEver" type="radio" value="1">{{$t('是')}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="isOfficerFamily">{{$t('您的亲厲或密切伙伴')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="isOfficerFamily" name="isOfficerFamily" checked="checked" type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="isOfficerFamily" name="isOfficerFamily" type="radio" value="1">{{$t('是')}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="willUseATM">{{$t('您是否预期存储或提取现金')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="willUseATM" name="willUseATM" type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="willUseATM" name="willUseATM" checked="checked" type="radio" value="1">{{$t('是')}}</label>
                                <div v-if="willUseATM=='1'" class="w-row">
                                    <div class="w-col w-col-6">
                                        <input type="text" name="saveMoneyMonth" v-model="saveMoneyMonth" v-validate="'required'" class="input w-input" :placeholder="$t('月存储额')" />
                                        <span v-if="errors.has('saveMoneyMonth')" class="error">{{ errors.first('saveMoneyMonth') }}</span>
                                    </div>
                                    <div class="w-col w-col-6">
                                        <input type="text" name="useMoneyMonth" v-model="useMoneyMonth" v-validate="'required'" class="input w-input" :placeholder="$t('月提现额')" />
                                        <span v-if="errors.has('useMoneyMonth')" class="error">{{ errors.first('useMoneyMonth') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="willBuyCheque">{{$t('您是否预期将购买银行本票')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="willBuyCheque" name="willBuyCheque" type="radio" checked="checked" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="willBuyCheque" name="willBuyCheque" type="radio" value="1">{{$t('是')}}</label>
                                <div v-if="willBuyCheque=='1'">
                                    <div>
                                        <label class="checkbox-inline"><input v-model="bankCheque" type="checkbox" name="bankCheque" value="1">{{$t('银行本票')}}</label>
                                        <label class="checkbox-inline"><input v-model="bankCheque" type="checkbox" name="bankCheque" value="2">{{$t('汇票')}}</label>
                                        <label class="checkbox-inline"><input v-model="bankCheque" type="checkbox" name="bankCheque" value="3">{{$t('旅行支票')}}</label>
                                        <label class="checkbox-inline"><input v-model="bankCheque" type="checkbox" name="bankCheque" value="4">{{$t('礼金卡')}}</label>
                                    </div>
                                    <div class="w-row">
                                        <div class="w-col w-col-6">
                                            <input type="text" name="bankChequeMonth" v-model="bankChequeMonth" v-validate="'required'" class="input w-input" :placeholder="$t('每月金额')" />
                                            <span v-if="errors.has('bankChequeMonth')" class="error">{{ errors.first('bankChequeMonth') }}</span>
                                        </div>
                                        <div class="w-col w-col-6">
                                            <input type="text" name="bankChequeUsage" v-model="bankChequeUsage" v-validate="'required'" class="input w-input" :placeholder="$t('用途')" />
                                            <span v-if="errors.has('bankChequeUsage')" class="error">{{ errors.first('bankChequeUsage') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="willRemitMoney">{{$t('您是否预期将每月进行电汇或电子转账')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="willRemitMoney" name="willRemitMoney" type="radio" checked="checked" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="willRemitMoney" name="willRemitMoney" type="radio" value="1">{{$t('是')}}</label>
                                <div v-if="willRemitMoney=='1'">
                                    <div class="w-row">
                                        <div class="w-col w-col-6">
                                            <input type="text" name="localAffluxMoney" v-model="localAffluxMoney" v-validate="'required'" class="input w-input" :placeholder="$t('本地汇入金额')" />
                                            <span v-if="errors.has('localAffluxMoney')" class="error">{{ errors.first('localAffluxMoney') }}</span>
                                        </div>
                                        <div class="w-col w-col-6">
                                            <input type="text" name="localRemitMoney" v-model="localRemitMoney" v-validate="'required'" class="input w-input" :placeholder="$t('本地汇出金额')" />
                                            <span v-if="errors.has('localRemitMoney')" class="error">{{ errors.first('localRemitMoney') }}</span>
                                        </div>
                                    </div>
                                    <div class="w-row">
                                        <div class="w-col w-col-6">
                                            <input type="text" name="intAffluxMoney" v-model="intAffluxMoney" v-validate="'required'" class="input w-input" :placeholder="$t('国际汇入金额')" />
                                            <span v-if="errors.has('intAffluxMoney')" class="error">{{ errors.first('intAffluxMoney') }}</span>
                                        </div>
                                        <div class="w-col w-col-6">
                                            <input type="text" name="intRemitMoney" v-model="intRemitMoney" v-validate="'required'" class="input w-input" :placeholder="$t('汇往海外的金额')" />
                                            <span v-if="errors.has('intRemitMoney')" class="error">{{ errors.first('intRemitMoney') }}</span>
                                        </div>
                                    </div>
                                    <div class="w-row">
                                        <div class="w-col w-col-6">
                                            <input type="text" name="remitCountry" v-model="remitCountry" v-validate="'required'" class="input w-input" :placeholder="$t('请列明国家')" />
                                            <span v-if="errors.has('remitCountry')" class="error">{{ errors.first('remitCountry') }}</span>
                                        </div>
                                    </div>
                                    <div class="w-row">
                                        <div class="w-col w-col-12">
                                            <label for="threeOrganization">{{$t('请列出您将每月进行电汇')}}<span class="red-text">*</span></label>
                                            <input type="text" name="threeOrganization" v-model="threeOrganization" v-validate="'required'" class="input w-input" :placeholder="$t('请列明国家')" />
                                            <span v-if="errors.has('threeOrganization')" class="error">{{ errors.first('threeOrganization') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="useOnlineBank">{{$t('您是否将使用华美银行提供的网络银行服务')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="useOnlineBank" name="useOnlineBank" type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="useOnlineBank" name="useOnlineBank" checked="checked" type="radio" value="1">{{$t('是')}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="useMobileBank">{{$t('您是否将使用华美银行的移动银行')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="useMobileBank" name="useMobileBank" checked="checked" type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="useMobileBank" name="useMobileBank" type="radio" value="1">{{$t('是')}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-6">
                            <label for="usePOP">{{$t('您是否将使用华美银行的个人')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="usePOP" name="usePOP" checked="checked" type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="usePOP" name="usePOP" type="radio" value="1">{{$t('是')}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-row">
                        <div class="w-col w-col-12">
                            <label for="currencyTransfer">{{$t('您是否将进行外币兑换业务')}}<span class="red-text">*</span></label>
                            <div>
                                <label class="checkbox-inline"><input v-model="currencyTransfer" name="currencyTransfer" checked="checked" type="radio" value="0">{{$t('否')}}</label>
                                <label class="checkbox-inline"><input v-model="currencyTransfer" name="currencyTransfer" type="radio" value="1">{{$t('是')}}</label>
                            </div>
                            <div v-if="currencyTransfer=='1'" class="w-row">
                                <div class="w-col w-col-6">
                                    <input type="text" name="currencyTransferMonth" v-model="currencyTransferMonth" v-validate="'required'" class="input w-input" :placeholder="$t('每月兑换金额')" />
                                    <span v-if="errors.has('currencyTransferMonth')" class="error">{{ errors.first('currencyTransferMonth') }}</span>
                                </div>
                                <div class="w-col w-col-6">
                                    <input type="text" name="currencyTransferPurpose" v-model="currencyTransferPurpose" v-validate="'required'" class="input w-input" :placeholder="$t('用途Purpose')" />
                                    <span v-if="errors.has('currencyTransferPurpose')" class="error">{{ errors.first('currencyTransferPurpose') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="w-row sub-row">
                <div class="w-col w-col-8"></div>
                <div class="w-col w-col-4">
                    <button type="submit" class="button login-button w-button">{{$t('提交')}}</button>
                </div>
            </div>
        </form>

        <pop-box :show-tip="showErrorTip" :tip="errorTip">
            <div class="w-row">
                <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button" @click="closeErrorTip">{{$t('确定')}}</a></div>
            </div>
        </pop-box>
    </div>

</template>

<script>
import {
  GET_HUAMEI_FILL_INFO_2_ACTION
} from '@/scenes/bank/modules'
import {GET_UPLOAD_KEY_ACTION,GET_USER_HUAMEI_ORDER_ACTION} from '@/scenes/mine/modules'
import { getElementTop } from "../../utils/utils.js";
import Datepicker from "vuejs-datepicker";
import { Validator } from "vee-validate";
import { zh } from "vuejs-datepicker/dist/locale";

export default {
  name: "bankaddinfo",
  components: { Datepicker },
  data() {
    return {
      showLoading: false,
      loadingText: "",
      showErrorTip: false,
      errorTip: "",

      zh: zh,
      progressHeight: 100,
      industryList: [
        "互联网科技",
        "金融服务",
        "房地产与建筑",
        "出版与媒体",
        "零售与消费品",
        "咨询机构",
        "工业",
        "电子",
        "其他"
      ],
      purpose: [
        "因私旅游",
        "境外留学",
        "房产投资",
        "境外就医",
        "货物贸易",
        "购买非投资类保险",
        "咨询服务"
      ],
      /* model */
      imageURL: "",
      last_name: "",
      first_name: "",
      gender: "0",
      birthday: "",
      birthplace: "",
      idCard: "",
      motherLast: "",
      passport: "",
      passportPlace: "",
      issueDate: "",
      expireDate: "",
      country: "86",
      phone: "",
      email: "",
      homeAddress: "",
      mailingAddress: "",
      workPlace: "",
      industry: "",
      jobTitle: "",
      taxNumber: "",
      isAmerican: "0",
      liveCountry: "",
      witchCountryPeople: "",
      transferWithGuba: "0",
      transferCountry: "",
      hasEstateInGuba: "0",
      hasEstateCountry: "",
      purposeForNewAccount: "3",
      otherPurpose: "",
      incomeType: ["工作收入", "投资", "个人储蓄"],
      otherIncomeType: "",
      isOfficerEver: "0",
      isOfficerFamily: "0",
      willUseATM: "1",
      saveMoneyMonth: "",
      useMoneyMonth: "",
      willBuyCheque: "0",
      bankCheque: [],
      bankChequeMonth: "",
      bankChequeUsage: "",
      willRemitMoney: "0",
      localAffluxMoney: "",
      localRemitMoney: "",
      intAffluxMoney: "",
      intRemitMoney: "",
      remitCountry: "",
      threeOrganization: "",
      useOnlineBank: "1",
      useMobileBank: "0",
      usePOP: "0",
      currencyTransfer: "0",
      currencyTransferMonth: "",
      currencyTransferPurpose: ""
      /* model */
    };
  },
  created() {
    const that = this
    this.$store.dispatch(GET_USER_HUAMEI_ORDER_ACTION)
    .then((res)=>{
        if (res && res.huamei_status) {
            let info = res.final_fill_info;
            // 如果不包含新申请表的字段,表明来自小程序,则不进行回填
            if (info && info.isAmerican) {
              // 初始化数据
              that.imageURL = info.imageURL || "";
              that.last_name = info.last_name || "";
              that.first_name = info.first_name || "";
              that.gender = info.gender || "0";
              that.birthday = info.birthday || "";
              that.birthplace = info.birthplace || "";
              that.idCard = info.idCard || "";
              that.motherLast = info.motherLast || "";
              that.passport = info.passport || "";
              that.passportPlace = info.passportPlace || "";
              that.issueDate = info.issueDate || "";
              that.expireDate = info.expireDate || "";
              that.country = info.country || "86";
              that.phone = info.phone || "";
              that.email = info.email || "";
              that.homeAddress = info.homeAddress || "";
              that.mailingAddress = info.mailingAddress || "";
              that.workPlace = info.workPlace || "";
              that.industry = info.industry || "";
              that.jobTitle = info.jobTitle || "";
              that.taxNumber = info.taxNumber || "";
              that.isAmerican = info.isAmerican || "";
              that.liveCountry = info.liveCountry || "";
              that.witchCountryPeople = info.witchCountryPeople || "";
              that.transferWithGuba = info.transferWithGuba || "";
              that.transferCountry = info.transferCountry || "";
              that.hasEstateInGuba = info.hasEstateInGuba || "0";
              that.hasEstateCountry = info.hasEstateCountry || "";
              that.purposeForNewAccount = info.purposeForNewAccount || "3";
              that.otherPurpose = info.otherPurpose || "";
              (that.incomeType = info.incomeType || [
                "工作收入",
                "投资",
                "个人储蓄"
              ]),
                (that.otherIncomeType = info.otherIncomeType || "");
              that.isOfficerEver = info.isOfficerEver || "0";
              that.isOfficerFamily = info.isOfficerFamily || "0";
              that.willUseATM = info.willUseATM || "1";
              that.saveMoneyMonth = info.saveMoneyMonth || "";
              that.useMoneyMonth = info.useMoneyMonth || "";
              that.willBuyCheque = info.willBuyCheque || "0";
              that.bankCheque = info.bankCheque || [];
              that.bankChequeMonth = info.bankChequeMonth || "";
              that.bankChequeUsage = info.bankChequeUsage || "";
              that.willRemitMoney = info.willRemitMoney || "0";
              that.localAffluxMoney = info.localAffluxMoney || "";
              that.localRemitMoney = info.localRemitMoney || "";
              that.intAffluxMoney = info.intAffluxMoney || "";
              that.intRemitMoney = info.intRemitMoney || "";
              that.remitCountry = info.remitCountry || "";
              that.threeOrganization = info.threeOrganization || "";
              that.useOnlineBank = info.useOnlineBank || "1";
              that.useMobileBank = info.useMobileBank || "0";
              that.usePOP = info.usePOP || "0";
              that.currencyTransfer = info.currencyTransfer || "0";
              that.currencyTransferMonth = info.currencyTransferMonth || "";
              that.currencyTransferPurpose = info.currencyTransferPurpose || "";
            }
          } else {
            this.errorTip = "数据加载失败,请检查网络";
            this.showErrorTip = true;
          }
    }).catch((error)=>{
        this.errorTip = "数据加载失败";
        this.showErrorTip = true;
    })
    const dictionary = {
      zh: {
        messages: {
          required: field => `${field}不能为空`,
          email: "请输入正确的电子邮箱"
        },
        attributes: {
          imageURL: "护照照片",
          last_name: "姓氏",
          first_name: "名字",
          gender: "性别",
          birthday: "出生日期",
          birthplace: "出生地",
          idCard: "身份证号码",
          motherLast: "母亲姓氏",
          passport: "护照号码",
          passportPlace: "护照签发地",
          issueDate: "护照签发日期",
          expireDate: "护照到期时间",
          // country:'86',
          phone: "手机号码",
          email: "电子邮箱",
          homeAddress: "家庭住址",
          mailingAddress: "邮寄地址",
          workPlace: "就职单位",
          industry: "行业类型",
          jobTitle: "工作职称",
          taxNumber: "报税识别号码",
          // isAmerican:'0',
          liveCountry: "居住国家",
          witchCountryPeople: "",
          transferWithGuba: "0",
          transferCountry: "",
          hasEstateInGuba: "0",
          hasEstateCountry: "",
          purposeForNewAccount: "",
          otherPurpose: "",
          incomeType: "",
          otherIncomeType: "",
          isOfficerEver: "",
          isOfficerFamily: "",
          willUseATM: "",
          saveMoneyMonth: "",
          useMoneyMonth: "",
          willBuyCheque: "",
          bankCheque: "",
          bankChequeMonth: "",
          bankChequeUsage: "",
          willRemitMoney: "",
          localAffluxMoney: "",
          localRemitMoney: "",
          intAffluxMoney: "",
          intRemitMoney: "",
          remitCountry: "",
          threeOrganization: "",
          useOnlineBank: "",
          useMobileBank: "",
          usePOP: "",
          currencyTransfer: "",
          currencyTransferMonth: "",
          currencyTransferPurpose: ""
        }
      }
    };
    Validator.localize(dictionary);
    const validator = new Validator();
    validator.localize("zh");
  },
  mounted() {
    this.getTokenUrl();
  },
  methods: {
    getTokenUrl: function() {
      const that = this;
      this.$store.dispatch(GET_UPLOAD_KEY_ACTION)
      .then((result)=>{
          Qiniu.uploader({
            runtimes: "html5,flash,html4", //上传模式,依次退化
            browse_button: "upload", //上传选择的点选按钮，**必需**
            // uptoken_url: 'https://wechat.fangpinduo.com/api/upload_key',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            uptoken: result.uptoken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
            // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
            // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
            domain: "https://wechat-pics.fangpinduo.com", //bucket 域名，下载资源时用到，**必需**
            get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
            // container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: "10mb", //最大文件体积限制
            // flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
            max_retries: 3, //上传失败最大重试次数
            dragdrop: true, //开启可拖曳上传
            drop_element: "container", //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: "4mb", //分块上传时，每片的体积
            auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            init: {
            FilesAdded: function(up, files) {
                console.log(up, files);
                var img = new o.Image();
                img.onload = function() {
                const src = this.getAsDataURL();
                that.imageURL = src;
                };
                img.load(files[0].getSource());
                // 开始上传按钮
                // document
                //     .getElementById('start')
                //     .addEventListener(
                //         'click',
                //         that.$options.methods.submitVoucher.bind(that, up)
                //     );
                // document.getElementById('start').onclick = function () {
                //     console.log(up);
                //     up.start();

                // }
                plupload.each(files, function(file) {
                img.loading = true;
                });
            },
            BeforeUpload: function(up, file) {
                // 每个文件上传前,处理相关的事情
            },
            UploadProgress: function(up, file) {
                // 每个文件上传时,处理相关的事情
                console.log(up, file);
                that.progressHeight = 100 - file.percent;
            },
            FileUploaded: function(up, file, info) {
                var domain = up.getOption("domain");
                var res = JSON.parse(info);
                var sourceLink = domain + "/" + res.key; //获取上传成功后的文件的Url
                that.imageURL = sourceLink;
                // that.$options.methods.submitProof.call(that, sourceLink);
            },
            Error: function(up, err, errTip) {
                //上传出错时,处理相关的事情
                console.log("error", err);
                that.errorTip = "图片上传失败，请重新上传！";
            },
            UploadComplete: function() {
                //队列文件处理完毕后,处理相关的事情
            },
            Key: function(up, file) {
                var key =
                "test" +
                "/" +
                file.id +
                file.name.substring(file.name.indexOf("."));
                // do something with key here
                return key;
            }
            }
        });
      })
    },
    validateBeforeSubmit: function() {
      let that = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          let {
            imageURL,
            last_name,
            first_name,
            gender,
            birthday,
            birthplace,
            idCard,
            motherLast,
            passport,
            passportPlace,
            issueDate,
            expireDate,
            country,
            phone,
            email,
            homeAddress,
            mailingAddress,
            workPlace,
            industry,
            jobTitle,
            taxNumber,
            isAmerican,
            liveCountry,
            witchCountryPeople,
            transferWithGuba,
            transferCountry,
            hasEstateInGuba,
            hasEstateCountry,
            purposeForNewAccount,
            otherPurpose,
            incomeType,
            otherIncomeType,
            isOfficerEver,
            isOfficerFamily,
            willUseATM,
            saveMoneyMonth,
            useMoneyMonth,
            willBuyCheque,
            bankCheque,
            bankChequeMonth,
            bankChequeUsage,
            willRemitMoney,
            localAffluxMoney,
            localRemitMoney,
            intAffluxMoney,
            intRemitMoney,
            remitCountry,
            threeOrganization,
            useOnlineBank,
            useMobileBank,
            usePOP,
            currencyTransfer,
            currencyTransferMonth,
            currencyTransferPurpose
          } = this;
          if (typeof birthday === "object") {
            birthday = birthday.toLocaleDateString();
          }
          if (typeof issueDate === "object") {
            issueDate = issueDate.toLocaleDateString();
          }
          if (typeof expireDate === "object") {
            expireDate = expireDate.toLocaleDateString();
          }
          that.showLoading = true;
          this.$store.dispatch(GET_HUAMEI_FILL_INFO_2_ACTION,{
              imageURL,
              last_name,
              first_name,
              gender,
              birthday,
              birthplace,
              idCard,
              motherLast,
              passport,
              passportPlace,
              issueDate,
              expireDate,
              country,
              phone,
              email,
              homeAddress,
              mailingAddress,
              workPlace,
              industry,
              jobTitle,
              taxNumber,
              isAmerican,
              liveCountry,
              witchCountryPeople,
              transferWithGuba,
              transferCountry,
              hasEstateInGuba,
              hasEstateCountry,
              purposeForNewAccount,
              otherPurpose,
              incomeType,
              otherIncomeType,
              isOfficerEver,
              isOfficerFamily,
              willUseATM,
              saveMoneyMonth,
              useMoneyMonth,
              willBuyCheque,
              bankCheque,
              bankChequeMonth,
              bankChequeUsage,
              willRemitMoney,
              localAffluxMoney,
              localRemitMoney,
              intAffluxMoney,
              intRemitMoney,
              remitCountry,
              threeOrganization,
              useOnlineBank,
              useMobileBank,
              usePOP,
              currencyTransfer,
              currencyTransferMonth,
              currencyTransferPurpose
          }).then((res)=>{
              if (res.success) {
                that.$router.push({
                path: "/bank/submitsuccess"
                });
            } else {
                if (res.errorCode == 40001) {
                this.errorTip = "订单提交失败,请联系客服";
                this.showErrorTip = true;
                } else {
                this.errorTip = res.message;
                this.showErrorTip = true;
                }
            }
            that.showLoading = false;
          }).catch((error)=>{
              this.errorTip = "资料提交错误,请联系客服";
            this.showErrorTip = true;
            that.showLoading = false;
          })
          return;
        } else {
          console.log(this.errors);
          const error = this.$el.querySelector(".error");
          if (!error) return;
          if (is_weixin()) {
            console.log("scrolltop on weixin:", error, getElementTop(error));
            window.scrollTo(0, getElementTop(error) - 200);
          } else {
            console.log("scrolltop on web:", error, getElementTop(error));
            window.scrollTo({
              top: getElementTop(error) - 200,
              behavior: "smooth"
            });
          }
        }
      });
    },
    closeErrorTip: function() {
      this.showErrorTip = false;
      this.errorTip = "";
    }
  }
};
</script>


<style lang='scss' scoped>
.page-content {
  padding: 16px;
  margin-bottom: 100px;
}

.radio-inline {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: 400;
  vertical-align: middle;
  cursor: pointer;
}

#form-bankinfo {
  label {
    margin-top: 20px;
    font-size: 12px;
    font-weight: normal;
  }
  legend {
    margin: 20px 0;
    font-size: 14px;
    color: #999;
    border-bottom: 1px solid #ddd;
    display: block;
    width: 100%;
    padding-top: 30px;
  }
  input {
    color: #333;
    margin-bottom: 0;
  }
  .error {
    color: #ff5000;
  }
}
.upload-warp {
  background: url(https://wechat-pics.fangpinduo.com/tmp/uploadImage.png)
    no-repeat;
  width: 190px;
  height: 190px;
  cursor: pointer;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
  .img-progress {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    display: none;
  }
  .progress-step {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
    left: 0;
    top: 0;
    position: absolute;
  }
}
.page-title {
  font-size: 16px;
  color: #333;
}
.desc {
  font-size: 12px;
  color: #aaa;
}
.imp-text {
  color: #ff5000;
  font-size: 12px;
}
.sub-row {
  margin-top: 30px;
}
.checkbox-inline {
  display: inline;
  margin-right: 10px;
  input {
    margin-right: 5px;
  }
}
</style>