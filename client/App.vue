<template>
  <div>
    <h3 style="background-color:#69f; height:60px; line-height:60px; border-radius:6px;padding:0 10px; color:#eee;">
      上传文件<span style="float:right">
        <el-button type="success" v-if="!currentUser" @click="dialogVisible = true">登录</el-button>
        <el-dropdown v-else @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎，{{currentUser}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </span>
    </h3>

    <p><input id="fileInput" @change="uploadImg" type="file" /></p>
    <p>上传进度-另一个服务器7000：{{progressNow}}%</p>
    <!-- <div v-if="!$subReady.Time">Loading...</div>
    <div v-else>
      <p>Hello {{hello}},
        <br>The time is now: {{currentTime}}
      </p>
      <button @click="updateTime">Update Time</button>
      <p>Startup times:</p>
      <ul>
        <li v-for="t in TimeCursor">
          {{t.time}}  -  {{t._id}}
        </li>
      </ul>
      <p>Meteor settings</p>
      <pre><code>
        {{settings}}
      </code></pre>
    </div> -->
    <div>
      <el-button type="primary" @click="getDownloadUrl">获取下载地址</el-button>
    </div>
    <h3 style="border-top:2px solid red;">下载列表 {{fileCounts}} </h3>
    <ul style="border:1px solid #eee;height:300px; overflow:auto;">
      <li v-for="(file,index) in allFiles" :key="file+index" style="margin-top:10px; list-style:none;">
        <!-- {{index}}--{{file.versions.original.path}} -->
        ({{index}}) <img :src="file.downloadUrl" width="50" height="50" style="border:1px solid #ccc;" />
        <a :href="file.downloadUrl" :download="file.name">{{file.name}}</a>
      </li>
    </ul>

    <div>
      <el-dialog title="登录界面" :visible.sync="dialogVisible" width="300px" :before-close="handleClose">
        <p>
          <el-input v-model="username" placeholder="user"></el-input>
        </p>
        <p>
          <el-input v-model="password" placeholder="pawd"></el-input>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUser">注 册</el-button>
          <el-button type="primary" @click="onLogin">登 录</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import '/imports/collections/Time';

  // user
  import { Accounts } from 'meteor/accounts-base'

  // upload
  import { Images } from '/imports/collections/images.js';

  // download
  import '/imports/collections/download.js';

  // test-table
  import '/imports/collections/test';

  export default {
    data() {
      console.log('Sending non-Meteor data to Vue component');
      return {
        hello: 'World',
        settings: Meteor.settings.public,   // not Meteor reactive
        progressNow: 0,
        username: '',
        password: '',
        dialogVisible: false,
        files: []
      }
    },
    filters: {
      changeLink(data) {
        console.log('data:', data)
        return './' + data.path + '?download=true'
      }
    },
    mounted() {
      this.files = [];
      setTimeout(() => {
        console.log('--Images', Images)
        this.files = Images.find().fetch();
      }, 2000)
    },
    // Vue Methods
    methods: {
      getDownloadUrl() {
        console.log('--url', this.allFiles);
        console.log('--one-url', this.allFiles[0].downloadUrl)
      },
      handleCommand(command) {
        console.log('click on item ' + command);
        switch (command)
        {
          case 'a':
            this.$alert('not things!');
            break;
          case 'b':
            console.log('be invoked logout')
            Meteor.logout();
            break;
        }
      },
      onLogin() {
        Meteor.loginWithPassword(this.username, this.password, (error, result) => {
          if (error)
          {
            this.$alert(error);
          } else
          {
            this.$message({
              message: 'login success!',
              type: 'success'
            });
            this.dialogVisible = false;
          }
        })
      },
      addUser() {
        let options = {
          username: this.username,
          password: this.password,
          profile: {
            sex: 'male',
            age: '18'
          }
        }
        Accounts.createUser(options, (error, result) => {
          if (error)
          {
            this.$message({
              message: error,
              type: 'error'
            });
          } else
          {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.dialogVisible = false;
          }
        })
      },
      login() {
        Meteor.loginWithPassword(user, password, [callback])
      },
      handleClose(done) {
        done();
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        // 1 > {});
      },
      ddpConnect() {
        // ddp connect
        return new Promise((resolve, reject) => {
          // 从vuex获取配置的userServer
          // var remote_url = 'http://localhost:7000';
          var remote_url = 'localhost:7000';
          if (!remote_url)
          {
            this.$alert('please set userServer!')
          }
          console.log('--remote_url:', remote_url)
          // var local_url = 'http://localhost:3000'
          var conn = DDP.connect(remote_url, { retry: true });
          var count = 0;
          Tracker.autorun(() => {
            console.log('--conn--:', count, conn.status());
            count++;
            if (conn.status().status === "connected")
            {
              console.log('connect connected', count, conn);
              // this.loginConnect = conn;
              resolve(conn)
            } else if (conn.status().status === "connecting")
            {
              console.log('connect connecting!', count);

            } else
            {
              console.log('connect failed!', count);
              resolve(false)
            }
          })
        })
      },
      async uploadImg(e) {
        var that = this;
        console.log('--uploadImg--', e);
        var ddpObj = await this.ddpConnect();
        // console.log('--ddpObj:',ddpObj.status())
        if (e.target.files[0])
        {
          // We upload only one file, in case
          // there was multiple files selected
          const file = e.target.files[0];
          console.log('--file:', file)
          console.log('Images:', Images)

          Images.insert({
            file: file,
            ddp: ddpObj,
            meta: {
              ownerId: 'yizheng',
              describe: 'good things'
            },
            onStart() {
              console.log('--Img is starting upload--');
              console.log('get:', this.progress.get())
            },
            onProgress(data) {
              console.log('--get:', data);
              that.progressNow = data;
            },
            onUploaded(error, fileObj) {
              if (error)
              {
                alert('Error during upload: ' + error);
              } else
              {
                console.log('文件名123：',fileObj.name)
                alert('File "' + fileObj.name + '" successfully uploaded');
              }
              // template.currentFile.set(false);
            },
            streams: 'dynamic',
            chunkSize: 'dynamic'
          });
        }
      },
      updateTime() {
        console.log('Calling Meteor Method UpdateTime');
        Meteor.call('UpdateTime');          // not Meteor reactive
      }
    },
    // Meteor reactivity
    meteor: {
      // Subscriptions - Errors not reported spelling and capitalization.
      $subscribe: {
        'Time': [],
        'Images': []
      },
      currentUser() {
        console.log('Meteor.user():', Meteor.user())
        return Meteor.user() ? Meteor.user().username : '';
      },
      // A helper function to get the current time
      currentTime() {
        // console.log('Calculating currentTime');
        var t = Time.findOne('currentTime') || {};
        return t.time;
      },
      fileCounts() {
        // this.files=[];
        // this.files = Images.find();
        return Images.find().count();
      },
      allFiles() {
        // Usage:
        let urlArr = [];
        Images.collection.find({}).forEach(function (fileRef) {
          console.log('--url:', Images.link(fileRef))
          urlArr.push(Images.link(fileRef))
        });
        let allImg = Images.find({}).fetch();
        for (let i = 0; i < allImg.length; i++)
        {
          allImg[i].downloadUrl = urlArr[i]
        }
        console.log('--allImg:', allImg);
        return allImg;
      },
      // A Minimongo cursor on the Time collection is added to the Vue instance
      TimeCursor() {
        // Here you can use Meteor reactive sources like cursors or reactive vars
        // as you would in a Blaze template helper
        return Time.find({}, {
          sort: { time: -1 }
        })
      },
    }
  }
</script>

<style scoped>
  p {
    font-size: 1em;
  }

  /deep/ .el-dialog__body {
    padding: 10px;
  }
</style>