//This one does doesn't mess up the close button

tau.mashups
	.addDependency('tp3/mashups/topmenu')
	.addDependency('tp3/mashups/popup')
	.addDependency('tp3/mashups/context')
  	.addDependency('tau/configurator')
	.addMashup(function(topmenu, popup, context, configurator) {

          
          	console.log(context.getApplicationPath());
          
		require(['//cdn.jsdelivr.net/jquery.handsontable/0.8.16/jquery.handsontable.full.js'], function() {
			var userimporter = function() {

			this._popup = null;


			this._render = function() {
				var mypopup = new popup();
				
				var $container = mypopup.$container;
				
                          	//$container.attr('style', 'overflow:auto');
                          	
                      		
                      		//<div id="out" style="postion:absolute"><div id="c" style="overflow:auto">
				var $importercontainer = $('<div id="importcontainer"></div>');
                        	
                          	//$importercontainer.attr('style', 'overflow:auto');
                          
                          	$importercontainer.append('<link rel="stylesheet" media="screen" href="http://smidge12.homedns.org/handsontable/0.8.5/jquery.handsontable.css">');
                          	
                          	$importercontainer.append('<button id="addRows">Add 10 Rows</button>');
				$importercontainer.append('<div id="dataTable"></div>');
                         	$importercontainer.append('<button id="your_btn_id">Test</button>');
				$importercontainer.append('<button id="doImport">Import</button>');
                          	$importercontainer.append('<div id="userImportResults">Log<BR><div id="theResults"></div></div>');
                          
                          	//$importercontainer.append('');
				//$importercontainer.attr('style', 'height: 200p');
				
                                $importercontainer.appendTo($container);
                          	
                                $("#importcontainer").wrap('<div id="con" style="position: fixed; top: 3%; left: auto; right: auto; bottom: 3%; width: 99%; overflow:auto;"></div>');
                                
                            	$("#theResults").hide();
                          
                          
                          	$("#dataTable").handsontable({
      					startRows: 20,
					startCols: 5,
					rowHeaders: true,
					removeRow: true,
					colHeaders: ["First Name","Last Name", "Login", "Email", "Password"]
  				 });
                          
                          	$("#addRows").click(function() {
					for(i=0;i<10;i++){
	  					$("#dataTable").handsontable('alter', 'insert_row', $("#dataTable").handsontable('countRows'));
					}
				});
                          
                          	
                          	$("#doImport").click(function(){
		
					var data = $("#dataTable").handsontable('getData');
                                  
                                  	var theUser = new Object();
					
        
                                  	var jsonText = JSON.stringify(theUser);
					console.log(jsonText);
                                  
					for (var i = 0; i < data.length; i++) {
		    				if(data[i][0] != null){
							console.log(data[i][0]);
                                                  
                                                  	theUser.FirstName = data[i][0];
							theUser.LastName = data[i][1];
                                                  	theUser.Login = data[i][2];
							theUser.Email = data[i][3];
                                  			theUser.Password = data[i][4];
                                                  	jsonText = JSON.stringify(theUser);
                                                  	console.log(i + "  " + jsonText);
                                                  
                                                  
                                                  	$.ajax({ 
                                				type: 'POST', 
                                  				url: url, 
                                  				dataType: 'json',
	                                			processData: false,
                                  				contentType: 'application/json',
        							data: jsonText, 
        							success: function(){ console.log("yay!");}, 
       								error: function(){console.log("boo!");}
    							}); 
							
		   				}
					}
		
				});
                          
                      		  var url = configurator.getApplicationPath() + '/api/v1/Users';
                          	 
                          
                          /*
                       	$('#your_btn_id').click(function(){ 
        			$.ajax({ 
                                	type: 'POST', 
                                  	url: url, 
                                  	dataType: 'json',
	                                processData: false,
                                  	contentType: 'application/json',
        				data: JSON.stringify({FirstName:"title", LastName:"title", Password:"title",Login:"title",Email:"title@nonexistingemail.com"}), 
        				success: function(){ console.log("yay!");}, 
       					error: function(){console.log("boo!");}
    					}); 
			}); 
                        */  
                          
				return mypopup;
			};

      
                
                          
                          
                          
			this._show = function() {
				if (this._popup == null) {
					this._popup = this._render();
				}
				this._popup.show();
			};

			topmenu
				.addItem('User Import')
				.onClick($.proxy(this._show, this));

			context.onChange($.proxy(function(d) {
				this._popup = null;
			}, this));
		};
			new userimporter();
		});

	});