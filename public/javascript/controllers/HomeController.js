(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  function HomeController(HomeFactory, UserFactory, $state) {
    var vm = this;
    vm.status = UserFactory.status;
    vm.post = {};
    vm.allPosts = {};
    // createdBy: vm.status._id, pic: vm.status.pic

    HomeFactory.getAllPosts().then(function(res) {
      vm.allPosts = res;
    });

    vm.createPost = function() {
      HomeFactory.postPost(vm.post).then(function(res) {
        vm.allPosts.push(vm.post);
        vm.post = {};
      });
    };

    vm.contact = function() { // this is for the mock contact form we have.
      $state.go("Home");
    };

    vm.followOnPost = function(post) {
      UserFactory.followOnPost(post.creatorId, vm.status)
        .then(function(res) {
          console.log("You have a new follower");
        });
    };


    vm.upvote = function(post) {
      if (post.creatorId == vm.status._id) {
        alert("You cannot vote for your own posts!");
				return;
      } else {
			if (post.upvotes.indexOf(vm.status._id) != -1){
				alert("You have voted for this post before!");
				return;
			} else {
				var index = post.downvotes.indexOf(vm.status._id);
				console.log(index);
				console.log(vm.status._id);
					if (index != -1){
						post.downvotes.splice(index, 1);
					}
					HomeFactory.upvote(post._id, vm.status._id);
			}
		}
		};


    vm.downvote = function(post) {
      if (post.creatorId == vm.status._id) {
        alert("You cannot vote for your own posts!");
				return;
      } else {
				if (post.downvotes.indexOf(vm.status._id) != -1){
					alert("You have voted for this post before!");
					return;
				} else {
					var index = post.upvotes.indexOf(vm.status._id);
						if (index != -1){
							post.upvotes.splice(index, 1);
						}
						HomeFactory.downvote(post._id, vm.status._id);
				}
			}
			};
  }
})();
