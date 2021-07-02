<template>
<div class="title">
    <h5 class="borderTitle">
        <slot></slot>
    </h5>
</div>
    
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.title{
    .borderTitle{
    padding-left :9px;
    margin: 14px 0px;
    font-size: 17px;
    line-height: 20px;
    font-weight: 400;
    color: #333;
    position: relative;
    text-align: left;
    &::before{
        position: absolute;
        left: 0px;
        content: "";
        top:50%;
        margin-top: -8px;
        // margin-left:9px;
        width: 2px;
        height: 16px;
        border-left:2px solid #dd001b
    }
}
}
</style>