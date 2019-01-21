<template>
    <div class="editBlog">
        <div class="editContent">
            <div class="edit">
                <span class="title">标题：</span>
                <el-input v-model="blogContent.blogTitle" placeholder="请输入博客名称" class="editTitle"></el-input>
            </div>
            <div>
                <span>类别</span>
                <el-select v-model="blogContent.category" placeholder="请选择类别">
                   <el-option
                        v-for="item in options"
                        :key="item.category"
                        :label="item.label"
                        :value="item.category" 
                        >
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>文章描述</span>
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="blogContent.introduce"
                minlength="5"
                maxlength="100">
                </el-input>
            </div>
            <mavon-editor v-model="blogContent.blogContent"/>
            <div class="save">
                <el-button @click="update">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'writeblog',
    data() {
        return {
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            blogContent: [{
                blogTitle: '',
                blogContent: '',
                introduce:'',
                category: ''
            }],
            options: [{
                    category: 'html',
                    label: 'html'
                }, {
                    category: 'css',
                    label: 'css'
                }, {
                    category: 'js',
                    label: 'javascript'
                }, {
                    category: 'vue',
                    label: 'vue'
                }, {
                    category: 'react',
                    label: 'react'
                }, {
                    category: 'node',
                    label: 'node',
                }, {
                    category: 'other',
                    label: 'other'
                }],
                blogId: this.$route.params.id
            };
    },
    mounted() {
        this.theEditBlog();
    },
    methods: {
        theEditBlog() {
            // console.log(this.blogContent.)
            this.$axios.get('/api/blogs/mainBlog' + '?id=' +this.blogId)
             .then((response) => {
                 this.blogContent = response.data.result.list[0];
                 console.log(this.blogContent);
             })
             .catch((error) => {
                 console.log('error' + error);
             })
        },
        update() {
            
            if (this.blogContent === '' || this.content === '') {
                alert("句子内容内容不能为空");
            } else {
                console.log(this.blogTitle);
                this.$axios.post('/api/blogs//updateBlog', {

                    blogTitle: this.blogContent.blogTitle,
                    blogContent: this.blogContent.blogContent,
                    category: this.blogContent.category,
                    introduce: this.blogContent.introduce,
                    id: this.blogId
                })
                .then((response) => {
                    let res = response.data;
                    if (res.status === '10001') {
                       console.log('success' + JSON.stringify(res));
                    }
                })
                .catch((error) => {
                    console.log(error + 'error');
                });    
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.editBlog{
    width: 90%;
    vertical-align: middle;
    position: relative;
    top: 20px;
    .editContent{
        margin: 0 auto;
        width: 84%;
        min-height: 600px;
        .edit{
    
            display: flex;
            .title {
                width: 50px;
            }
            .editTitle{
                flex: 1;
            }
        }
        .v-note-wrapper{
            min-height: 500px;
        }
    }
}
</style>

