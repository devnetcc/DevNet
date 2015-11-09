(function() {
	'use strict';
	angular.module('app')
	.controller('ProfilePostController', ProfilePostController);

	function ProfilePostController(HomeFactory, UserFactory,  $state, $stateParams) {
		var vm = this;
		    vm.status = UserFactory.status;
        vm.post = {createdBy: vm.status._id, pic: vm.status.pic};



HomeFactory.getAllPostsByProfile($stateParams.id).then(function(res){
  vm.posts=res;
});

vm.createPost = function (){
HomeFactory.postPost(vm.post).then(function(res){
	vm.post = {};
});
};

// vm.getCopy = function(post) {
// 	return angular.copy(post);
// };
//
// vm.editPost = function (postID) {
// 	console.log(post);
// HomeFactory.editPost(postID).then(function(res){
// 	vm.editingPost = null;
// });
// };



vm.deletePost = function(postID) {
HomeFactory.deletePost(postID).then(function() {
		vm.posts.splice(vm.posts.indexOf(postID), 1);
		});
};




	}
})();
