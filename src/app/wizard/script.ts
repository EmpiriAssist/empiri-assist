var mainModule = angular.module('MainModule', ['ui.select', 'ngSanitize', 'decision.tree']);

mainModule.controller('MainController', ['$decisionTree', function($decisionTree) {
  
  var vm = this;
  
  var RiskFactor = Object.freeze({ "HIGH": "HIGH", "MODERATE": "MODERATE", "LOW": "LOW"});
    
  var riskAssessmentTree =
    {
      question: "What results would you like to see under grouped keys?",
      children: [
        {
          value: "Summaries of many documents",
          question: "How do you want to sort the grouping keys?:",
          children: [
            { value: "By the key's value", result: { risk: RiskFactor.LOW, 
                description: 'Use the <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html">composite aggregation</a>',
                explanation:'An example might be a head office sales report, grouping sales by "Store" and then summing sales by products etc. If you have too many results to return in a single response, page through them use the <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_after">after</a> parameter'} },
            { value: "Some other sort order", 
                question: "How do you want to sort the grouping keys?:",
                children: [
                      { value: "Sum, avg, min, max, or count of a field's values", 
                            question: "How many unique keys do you need to return? ",
                            children: [
                              { value: "Few (less than 10,000)", 
                              
                                  question:"Accuracy may be a concern. How many unique keys are in your index?",
                                  "children":[
                                    { value:"Few (less than 100,000)", 
                                  result: { risk: RiskFactor.MODERATE, 
                                  description: 'Use the <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html">terms aggregation</a> - accuracy should be OK',
                                  explanation:'An example might be a top-products report, listing products ordered by the sum of their sales values.'+
                                  'Watch out for non-zero values in <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_calculating_document_count_error">doc_count_error_upper_bound</a> in results.'+
                                  ' If this happens consider increasing <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_shard_size_3">shard_size</a> '+
                                  'setting to trade RAM for accuracy.'} },
                                  {
                                    value:"Many (perhaps millions)",
                                    question:"What sort of client is making the request?",
                                    children:[
                                      {
                                        value:"A generic client (eg Kibana)",
                                        question: "How are you sorting keys?",
                                        children: [
                                          
                                          {
                                            "value":"largest of a value",
                                            result: { risk: RiskFactor.MODERATE, 
                                                description: 'Use the <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html">terms aggregation</a> - accuracy may be an issue',
                                  explanation:'An example might be a find high-value customers with the biggest spends.'+
                                  'Watch out for non-zero values in <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_calculating_document_count_error">doc_count_error_upper_bound</a> in results.'+
                                  ' If this happens consider increasing <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_shard_size_3">shard_size</a> '+
                                  'setting to trade RAM for accuracy. (Kibana cannot use multiple requests with terms partitioning to overcome accuracy issues).'+
                                  '<br> If most keys only occur once then setting shard_size may not help and you have the "Liz Taylor problem" which will need <a href="https://discuss.elastic.co/t/question-about-approximate-counts/218800/4?u=mark_harwood">another approach</a>'              
                                                     } 
                                          },
                                          {
                                            "value":"smallest of a value or cardinality count",
                                            result: { risk: RiskFactor.MODERATE, 
                                                      description: 'Use an <a target="_blank" href="https://www.elastic.co/webinars/introducing-data-frame-transforms-for-elastic-machine-learning/?view=1">entity-centric index</a> to overcome accuracy or memory constraints that are likely with these types of queries',
                                                      explanation: 'Example use case might be outlier detection - finding'+
                                                                   ' new process names by first-seen date, descending order.<br>'+
                                                                  'The disadvantage with this approach is that it requires maintenance of a secondary index. '+
                                                                  '<br>The advantage is that queries are fast and simple on pre-computed values.'
                                            } 
                                          }
                                        ]
                                      },
                                      {
                                        value:"Custom code calling the elasticsearch API)",
                                        
                                        
                                        question: "How are you sorting keys?",
                                        children: [
                                          
                                          {
                                            "value":"largest of a value",
                                            result: { risk: RiskFactor.MODERATE, 
                                                description: 'Use the <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html">terms aggregation</a> - accuracy may be an issue',
                                  explanation:'An example might be a find high-value customers with the biggest spends.'+
                                  'Watch out for non-zero values in <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_calculating_document_count_error">doc_count_error_upper_bound</a> in results.'+
                                  ' If this happens consider increasing <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_shard_size_3">shard_size</a> '+
                                  'setting to trade RAM for accuracy. <br>If you hit memory issues with large shard_size settings (eg too many buckets) then either <ul>'+
                                    '<li>break your query into multiple '+
                                  ' requests using <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_filtering_values_with_partitions">term partitioning</a> or</li>'+
                                    '<li>Move your related data closer together using <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-routing-field.html">routing</a> (same shard) '+
                                  ' or an <a target="_blank" href="https://www.elastic.co/webinars/introducing-data-frame-transforms-for-elastic-machine-learning/?view=1">entity-centric index</a> (same document)</li>'+
                                  '</ul>'
                                                
                                                     } 
                                          },
                                          {
                                            "value":"smallest of a value or cardinality count",
                                            result: { risk: RiskFactor.MODERATE, 
                                                  description: 'Use the terms aggregation with <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_filtering_values_with_partitions">partitioning</a>'+
                                                  ' to deal with accuracy issues or memory constraints likely to be an issue with these types of requests.',
                                                  explanation:'An example might be a dormant-accounts report - find all users '+
                                                  'whose last logged activity was more than 2 years ago.<br>'+
                                                  'The disadvantage with this approach is that it requires careful sizing of partitions and '+
                                                  ' client-side stitching of results together.<br>The advantage is that each partition returned '+
                                                  ' can be made to have accurate results.'
                                                       } 
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                  ]
                              },
                                { value: "Many (hundreds of thousands or more)", 
                                  result: { risk: RiskFactor.MODERATE, 
                                  description: 'Use the terms aggregation with <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#_filtering_values_with_partitions">partitioning</a>'+
                                  ' to deal with high data volumes',
                                  explanation:'An example might be a dormant-accounts report - find all users '+
                                  'whose last logged activity was more than 2 years ago.<br>'+
                                  'The disadvantage with this approach is that it requires careful sizing of partitions and '+
                                  ' client-side stitching of results together.<br>The advantage is that each partition returned '+
                                  ' can be made to have accurate results.'} }
          
                                                                
                           ]
                      },
                      { value: "Something more complex", 
                          result: { risk: RiskFactor.LOW, 
                                    description: 'Use an <a target="_blank" href="https://www.elastic.co/webinars/introducing-data-frame-transforms-for-elastic-machine-learning/?view=1">entity-centric index</a>',
                          explanation:'Often used for behavioural analysis. "Naughtiest car owners" are found by computing miles driven between'+
                          ' the date of a roadworthiness test failure report and the subsequent test pass<br>'+
                          'The disadvantage with this approach is that it requires maintenance of a secondary index. '+
                        '<br>The advantage is that queries are fast and simple on pre-computed values.'} }
                  
                  ]
            }
          ]
        },
        {
          value: "Individual raw documents",
          question: "How many keys do you need to page through?",
          children: [
            { value: "Few (maybe < one thousand)", result: { risk: RiskFactor.LOW, description: 'Use <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-collapse.html">field collapsing</a>',
              explanation:"Example use:  web searches that need to limit the documents returned from any one website"  } },
            
            
            {
              value: "Many (millions or more)",
              question: "How many concurrent users do you expect?",
              children: [
                  { value: "One", result: { risk: RiskFactor.MODERATE, description: 'Use the <a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html">scroll API</a>',
                    explanation:"Typically used to export data in bulk" 
                  } },
                { value: "Many", result: { risk: RiskFactor.HIGH, description: "No solution",
                   explanation:"Your users will demand too much compute from the system. "+
                   "We can't let many users simultaneously perform deep pagination on these types of results."+
                   "Consider other ways to allow users to step through results e.g. offering filtering options"
                } }
              ]
            }            
            
          ]
        }
        
      ]
    };

	function tweak(tree, tweaker) {
	  tweaker(tree);
	  angular.forEach(tree.children, function (value) {
	    tweak(value, tweaker);
	    
	  });
	  
	  return tree;
	}

	vm.decisionTreeModes = [
		{ label: "ALL Buttons", tree: riskAssessmentTree },
		{ label: "ALL Selects", tree: tweak(
			angular.copy(riskAssessmentTree),
			function (child) {
				if (child.children) {
					child.selector = "drop-down";
				}
			}
		) },
		{ label: "Mixed (DDs when > 4 options)", tree: tweak(
			angular.copy(riskAssessmentTree),
			function (child) {
				if (child.children && child.children.length > 4) {
					child.selector = "drop-down";
				}
			}
		) }
	];
	vm.selectedDecisionTreeMode = vm.decisionTreeModes[0];

  vm.openDecisionTreeWizard = function () {
    
    $decisionTree.openWizard(
      {
        title: 'So you want to use elasticsearch to "Group by"...',
        resultTemplateUrl: 'risk-assessment-result.html',
        decisionTree: vm.selectedDecisionTreeMode.tree
      }  
    ).then(
      function (result) {
        vm.result = result;
      }
    );
  };

}]);

mainModule.directive('decisionTreeResult', function () {
  return {
    restrict: 'E',
    scope: {
      result: '='
    },
    templateUrl: 'risk-assessment-result.html'
  }
});
