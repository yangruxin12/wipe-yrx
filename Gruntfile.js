//包装函数
module.exports = function(grunt){
    //任务配置，所有插件的配置信息
    grunt.initConfig({
//uglify插件的配置信息	
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
		
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build:{
				src:'src/swipe.js',
				dest:'dist/<%=pkg.name%>-<%=pkg.version%>.min.js'
			}
		},
		//jshint的插件配置信息
		jshint:{
			build:['src/*.js'],
			options:{
				jshintrc:'.jshintrc' //检测JS代码错误要根据此文件的设置规范进行检测，可以自己修改规则
			}
		},
		csslint:{
			build:['src/*.css'],
			options:{
				csslintrc:'.csslintrc' //检测JS代码错误要根据此文件的设置规范进行检测，可以自己修改规则
			}
		},
		concat: {
			options: {
					separator: ';'
				},
			dist: {
				src: ['src/1.js' , 'src/2.js'],
				dest: 'dist/built.js'
			},
		},
		
		// 复制
		copy: {
		  main: {
			timestamp : true,
		    expand: true,
		    src: 'src/*',
		    dest: 'dist/',
		  },
		},
		// clean插件的配置信息
		clean: {
		  // build: {
		  //   // src: ['dist/src']  //删除的文件路径
			 
		  // }
		  content : ['dist/*','sample/js/*']
		},				// copy插件的配置信息
			copy: {
				main: {
					files: [
						//完整复制整个目录到指定目录
						  // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'}, 
						  // 拷贝文件及子目录到指定目录
						  // {expand: true, src: ['path/**'], dest: 'dest/'},
						// 进入某个目录下，拷贝文件到指定目录
						{expand: true, cwd: 'dist/', src: ['**'], dest: 'sample/js/'},
					],
				},
			},
			// 替换插件
			replace: {
			  another_example: {
			    src: ['sample/demo.html'],
			    overwrite: true,  // 改写匹配的源文件
			    replacements: [{
			      from: /-\d\.\d\.\d/g,
			      to: "<%= pkg.version %>"
			    }]
			  }
			}

	
    });
	// 使用插件第二步 : 加载插件
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// 检查js语法插件
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// 检查css语法插件
	grunt.loadNpmTasks('grunt-contrib-csslint');
	// 连接多个文件插件
	grunt.loadNpmTasks("grunt-contrib-concat")
	
	// 使用复制插件
	grunt.loadNpmTasks("grunt-contrib-copy")
	
	// 使用清除插件
	grunt.loadNpmTasks("grunt-contrib-clean")
	// 拷贝
	grunt.loadNpmTasks("grunt-contrib-copy");
	// 替换
	grunt.loadNpmTasks('grunt-text-replace');
	
	//告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
    // 使用插件第三步 : 在任务中注册插件
	grunt.registerTask('default',['clean' ,'uglify',"copy","replace"])

	
};