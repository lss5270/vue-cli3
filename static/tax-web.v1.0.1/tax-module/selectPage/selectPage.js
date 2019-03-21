/**
 * @summary     SelectPage
 * @desc        Simple and powerful selection plugin
 * @file        selectpage.js
 * @version     2.18
 * @author      TerryZeng
 * @contact     https://terryz.github.io/
 * @license     MIT License
 *
 */
;(function($){
	"use strict";
	/**
	 * Default options
	 */
	var defaults = {
		/**
		 * Data source
		 * @type {string|Object}
         *
		 * string：server side request url address
		 * Object：JSON array，format：[{a:1,b:2,c:3},{...}]
		 */
		data: undefined,
		/**
		 * Language ('cn', 'en', 'ja', 'es', 'pt-br')
		 * @type string
         * @default 'cn'
		 */
		lang: 'cn',
		/**
         * Multiple select mode(tags)
		 * @type boolean
         * @default false
		 */
		multiple: false,
        /**
         * pagination or not
         * @type boolean
         * @default true
         */
        pagination: true,
        /**
         * Show up menu button
         * @type boolean
         * @default true
         */
        dropButton: true,
        /**
         * Result list visible size in pagination bar close
         * @type number
         * @default 10
         */
        listSize : 10,
		/**
		 * Show control bar in multiple select mode
		 * @type boolean
         * @default true
		 */
		multipleControlbar: true,
		/**
         * Max selected item limited in multiple select mode
		 * @type number
         * @default 0(unlimited)
		 */
		maxSelectLimit: 0,
		/**
		 * Select result item to close list, work on multiple select mode
		 * @type boolean
         * @default false
		 */
		selectToCloseList: false,
		/**
         * Init selected item key, the result will match to option.keyField option
		 * @type string 
		 */
		initRecord: undefined,
		/**
		 * The table parameter in server side mode
		 * @type string
		 */
		dbTable: 'tbl',
		/**
         * The value field, the value will fill to hidden element
		 * @type string
         * @default 'id'
		 */
		keyField: 'id',
		/**
         * The show text field, the text will show to input element or tags(multiple mode)
		 * @type string
         * @default 'name'
		 */
		showField: 'name',
		/**
         * Actually used to search field
		 * @type string
		 */
		searchField : undefined,
		/**
		 * Search type ('AND' or 'OR')
		 * @type string
         * @default 'AND'
		 */
		andOr: 'AND',
        /**
         * Result sort type
         * @type array - if not set, will default used showField field
         * @example
         * orderBy : ['id desc']
         */
        orderBy: undefined,
		/**
		 * Page size
		 * @type number
         * @default 10
		 */
		pageSize: 10,
		/**
         * Server side request parameters
		 * @type function
		 * @return object
		 * @example params : function(){return {'name':'aa','sex':1};}
		 */
		params : undefined,
		/**
         * Custom result list item show text
		 * @type function
		 * @param data {object} row data
		 * @return string
		 */
		formatItem : formatItem,
        /**
         * Have some highlight item and lost focus, auto select the highlight item
         * @type boolean
         * @default false
         */
        autoFillResult: false,
		/**
         * Auto select first item in show up result list or search result
         * depend on `autoFillResult` option set to true
		 * @type boolean
         * @default false
		 */
		autoSelectFirst: false,
		/**
         * Whether clear input element text when enter some keywords to search and no result return
		 * @type boolean
         * @default true
		 */
		noResultClean: true,
		/**
		 * Select only mode
		 * @type boolean
		 */
		selectOnly: false,
        /**
         * Input to search delay time, work on ajax data source
         * @type number
         * @default 0.5
         */
        inputDelay: 0.5,
		/**
		 * -----------------------------------------Callback--------------------------------------------
		 */
		/**
		 * Result list item selected callback
         * @type function
		 * @param object - selected item json data
		 * @param self   - plugin object
		 */
		eSelect : undefined,
        /**
         * Before result list show up callback, you can do anything prepared
         * @param self - plugin object
         */
        eOpen : undefined,
		/**
         * Server side return data convert callback
		 * @type function
		 * @param data {object} server side return data
         * @param self {object} plugin object
		 * @return {object} return data format：
		 * @example 
		 * {
		 *   list : [{name:'aa',sex:1},{name:'bb',sex:1}...],
		 *   totalRow : 100
		 * }
		 */
		eAjaxSuccess : undefined,
		/**
         * Close selected item tag callback (multiple mode)
		 * @type function
		 * @param removeCount {number} remove item count
         * @param self {object} plugin object
		 */
		eTagRemove : undefined,
        /**
         * Clear selected item callback(single select mode)
         * @type function
         * @param self {object} plugin object
         */
        eClear : undefined
	};


	/**
     * SelectPage class definition
	 * @constructor
	 * @param {Object} input - input element
	 * @param {Object} option
	 */
	var SelectPage = function(input, option) {
		this.setOption(option);
		this.setLanguage();
		this.setCssClass();
		this.setProp();
		this.setElem(input);

		this.setButtonAttrDefault();
		this.setInitRecord();

		this.eDropdownButton();
		this.eInput();
		this.eWhole();
	};
	/**
	 * Plugin version number
	 */
	SelectPage.version = '2.18';
	/**
	 * Plugin object cache key
	 */
	SelectPage.dataKey = 'selectPageObject';
	/**
	 * Options set
	 * @param {Object} option
	 */
	SelectPage.prototype.setOption = function(option) {
		//use showField to default
		option.searchField = option.searchField || option.showField;
		
		option.andOr = option.andOr.toUpperCase();
		if(option.andOr!=='AND' && option.andOr!=='OR') option.andOr = 'AND';

		//support multiple field set
		var arr = ['searchField'];
		for (var i = 0; i < arr.length; i++) {
			option[arr[i]] = this.strToArray(option[arr[i]]);
		}

		//set default order field
		option.orderBy = option.orderBy || option.showField;

		//set multiple order field
		//example:  [ ['id', 'ASC'], ['name', 'DESC'] ]
		option.orderBy = this.setOrderbyOption(option.orderBy, option.showField);
        //close auto fill result and auto select first in multiple mode and select item not close list
		if(option.multiple && !option.selectToCloseList){
			option.autoFillResult = false;
			option.autoSelectFirst = false;
		}
        //show all item when pagination bar close, limited 200
        if(!option.pagination) option.pageSize = 200;
		if($.type(option.listSize) !== 'number' || option.listSize < 0) option.listSize = 10;

		this.option = option;
	};

	/**
	 * String convert to array
	 * @param str {string}
	 * @return {Array}
	 */
	SelectPage.prototype.strToArray = function(str) {
		if(!str) return '';
		return str.replace(/[\s　]+/g, '').split(',');
	};

	/**
	 * Set order field
	 * @param {Array} arg_order
	 * @param {string} arg_field
	 * @return {Array}
	 */
	SelectPage.prototype.setOrderbyOption = function(arg_order, arg_field) {
		var arr = [],orders = [];
		if (typeof arg_order == 'object') {
			for (var i = 0; i < arg_order.length; i++) {
				orders = $.trim(arg_order[i]).split(' ');
				arr[i] = (orders.length == 2) ? orders: [orders[0], 'ASC'];
			}
		} else {
			orders = $.trim(arg_order).split(' ');
			arr[0] = (orders.length == 2) ? orders: (orders[0].match(/^(ASC|DESC)$/i)) ? [arg_field, orders[0]] : [orders[0], 'ASC'];
		}
		return arr;
	};

	/**
	 * i18n
	 */
	SelectPage.prototype.setLanguage = function() {
		var message, p = this.option;
		switch (p.lang) {
		// German
		case 'de':
			message = {
				add_btn: 'Hinzufügen-Button',
				add_title: 'Box hinzufügen',
				del_btn: 'Löschen-Button',
				del_title: 'Box löschen',
				next: 'Nächsten',
				next_title: 'Nächsten' + p.pageSize + ' (Pfeil-rechts)',
				prev: 'Vorherigen',
				prev_title: 'Vorherigen' + p.pageSize + ' (Pfeil-links)',
				first_title: 'Ersten (Umschalt + Pfeil-links)',
				last_title: 'Letzten (Umschalt + Pfeil-rechts)',
				get_all_btn: 'alle (Pfeil-runter)',
				get_all_alt: '(Button)',
				close_btn: 'Schließen (Tab)',
				close_alt: '(Button)',
				loading: 'lade...',
				loading_alt: '(lade)',
				page_info: 'page_num von page_count',
				select_ng: 'Achtung: Bitte wählen Sie aus der Liste aus.',
				select_ok: 'OK : Richtig ausgewählt.',
				not_found: 'nicht gefunden',
				ajax_error: 'Bei der Verbindung zum Server ist ein Fehler aufgetreten.',
                clear: 'Löschen Sie den Inhalt',
                select_all: 'Wähle diese Seite',
                unselect_all: 'Diese Seite entfernen',
                clear_all: 'Alles löschen',
                max_selected: 'Sie können nur bis zu max_selected_limit Elemente auswählen'
			};
			break;

		// English
		case 'en':
			message = {
				add_btn: 'Add button',
				add_title: 'add a box',
				del_btn: 'Del button',
				del_title: 'delete a box',
				next: 'Next',
				next_title: 'Next' + p.pageSize + ' (Right key)',
				prev: 'Prev',
				prev_title: 'Prev' + p.pageSize + ' (Left key)',
				first_title: 'First (Shift + Left key)',
				last_title: 'Last (Shift + Right key)',
				get_all_btn: 'Get All (Down key)',
				get_all_alt: '(button)',
				close_btn: 'Close (Tab key)',
				close_alt: '(button)',
				loading: 'loading...',
				loading_alt: '(loading)',
				page_info: 'page_num of page_count',
				select_ng: 'Attention : Please choose from among the list.',
				select_ok: 'OK : Correctly selected.',
				not_found: 'not found',
				ajax_error: 'An error occurred while connecting to server.',
                clear: 'Clear content',
                select_all: 'Select current page',
                unselect_all: 'Clear current page',
                clear_all: 'Clear all selected',
                max_selected: 'You can only select up to max_selected_limit items'
			};
			break;

		// Spanish
		case 'es':
			message = {
				add_btn: 'Agregar boton',
				add_title: 'Agregar una opcion',
				del_btn: 'Borrar boton',
				del_title: 'Borrar una opcion',
				next: 'Siguiente',
				next_title: 'Proximas ' + p.pageSize + ' (tecla derecha)',
				prev: 'Anterior',
				prev_title: 'Anteriores ' + p.pageSize + ' (tecla izquierda)',
				first_title: 'Primera (Shift + Left)',
				last_title: 'Ultima (Shift + Right)',
				get_all_btn: 'Ver todos (tecla abajo)',
				get_all_alt: '(boton)',
				close_btn: 'Cerrar (tecla TAB)',
				close_alt: '(boton)',
				loading: 'Cargando...',
				loading_alt: '(Cargando)',
				page_info: 'page_num de page_count',
				select_ng: 'Atencion: Elija una opcion de la lista.',
				select_ok: 'OK: Correctamente seleccionado.',
				not_found: 'no encuentre',
				ajax_error: 'Un error ocurrió mientras conectando al servidor.',
                clear: 'Borrar el contenido',
                select_all: 'Elija esta página',
                unselect_all: 'Borrar esta página',
                clear_all: 'Borrar todo marcado',
                max_selected: 'Solo puedes seleccionar hasta max_selected_limit elementos'
			};
			break;

		// Brazilian Portuguese
		case 'pt-br':
			message = {
				add_btn: 'Adicionar botão',
				add_title: 'Adicionar uma caixa',
				del_btn: 'Apagar botão',
				del_title: 'Apagar uma caixa',
				next: 'Próxima',
				next_title: 'Próxima ' + p.pageSize + ' (tecla direita)',
				prev: 'Anterior',
				prev_title: 'Anterior ' + p.pageSize + ' (tecla esquerda)',
				first_title: 'Primeira (Shift + Left)',
				last_title: 'Última (Shift + Right)',
				get_all_btn: 'Ver todos (Seta para baixo)',
				get_all_alt: '(botão)',
				close_btn: 'Fechar (tecla TAB)',
				close_alt: '(botão)',
				loading: 'Carregando...',
				loading_alt: '(Carregando)',
				page_info: 'page_num de page_count',
				select_ng: 'Atenção: Escolha uma opção da lista.',
				select_ok: 'OK: Selecionado Corretamente.',
				not_found: 'não encontrado',
				ajax_error: 'Um erro aconteceu enquanto conectando a servidor.',
                clear: 'Limpe o conteúdo',
                select_all: 'Selecione a página atual',
                unselect_all: 'Remova a página atual',
                clear_all: 'Limpar tudo',
                max_selected: 'Você só pode selecionar até max_selected_limit itens'
			};
			break;

		// Japanese
		case 'ja':
			message = {
				add_btn: '追加ボタン',
				add_title: '入力ボックスを追加します',
				del_btn: '削除ボタン',
				del_title: '入力ボックスを削除します',
				next: '次へ',
				next_title: '次の' + p.pageSize + '件 (右キー)',
				prev: '前へ',
				prev_title: '前の' + p.pageSize + '件 (左キー)',
				first_title: '最初のページへ (Shift + 左キー)',
				last_title: '最後のページへ (Shift + 右キー)',
				get_all_btn: '全件取得 (下キー)',
				get_all_alt: '画像:ボタン',
				close_btn: '閉じる (Tabキー)',
				close_alt: '画像:ボタン',
				loading: '読み込み中...',
				loading_alt: '画像:読み込み中...',
				page_info: 'page_num 件 (全 page_count 件)',
				select_ng: '注意 : リストの中から選択してください',
				select_ok: 'OK : 正しく選択されました。',
				not_found: '(0 件)',
				ajax_error: 'サーバとの通信でエラーが発生しました。',
                clear: 'コンテンツをクリアする',
                select_all: '当ページを選びます',
                unselect_all: '移して当ページを割ります',
                clear_all: '選択した項目をクリアする',
                max_selected: '最多で max_selected_limit のプロジェクトを選ぶことしかできません'
			};
			break;
        // 中文
        case 'cn':
        default:
            message = {
                add_btn: '添加按钮',
                add_title: '添加区域',
                del_btn: '删除按钮',
                del_title: '删除区域',
                next: '下一页',
                next_title: '下' + p.pageSize + ' (→)',
                prev: '上一页',
                prev_title: '上' + p.pageSize + ' (←)',
                first_title: '首页 (Shift + ←)',
                last_title: '尾页 (Shift + →)',
                get_all_btn: '获得全部 (↓)',
                get_all_alt: '(按钮)',
                close_btn: '关闭 (Tab键)',
                close_alt: '(按钮)',
                loading: '读取中...',
                loading_alt: '(读取中)',
                page_info: '第 page_num 页(共page_count页)',
                select_ng: '请注意：请从列表中选择.',
                select_ok: 'OK : 已经选择.',
                not_found: '无查询结果',
                ajax_error: '连接到服务器时发生错误！',
                clear: '清除内容',
                select_all: '选择当前页项目',
                unselect_all: '取消选择当前页项目',
                clear_all: '清除全部已选择项目',
                max_selected: '最多只能选择 max_selected_limit 个项目'
            };
            break;
		}
		this.message = message;
	};

	/**
	 * Css classname defined
	 */
	SelectPage.prototype.setCssClass = function() {
		var css_class = {
			container: 'sp_container',
			container_open: 'sp_container_open',
			re_area: 'sp_result_area',
            result_open: 'sp_result_area_open',
			control_box: 'sp_control_box',
			//multiple select mode
			element_box: 'sp_element_box',
			navi: 'sp_navi',
			//result list
			search_input: 'sp_search_input',
			results: 'sp_results',
			re_off: 'sp_results_off',
			select: 'sp_over',
			select_ok: 'sp_select_ok',
			select_ng: 'sp_select_ng',
            selected: 'sp_selected',
			input_off: 'sp_input_off',
			message_box: 'sp_message_box',
            disabled: 'sp_disabled',
			
			button: 'sp_button',
			btn_on: 'sp_btn_on',
			btn_out: 'sp_btn_out',
			input: 'sp_input',
            clear_btn : 'sp_clear_btn',
            align_right : 'sp_align_right'
		};
		this.css_class = css_class;
	};

	/**
	 * Plugin inner properties
	 */
	SelectPage.prototype.setProp = function() {
		this.prop = {
		    //input disabled status
		    disabled : false,
			current_page: 1,
			//total page
			max_page: 1,
			//ajax data loading status
			is_loading: false,
			xhr: false,
			key_paging: false,
			key_select: false,
			//last selected item value
			prev_value: '',
            //last selected item text
            selected_text : '',
			last_input_time: undefined,
            init_set: false
		};
		this.template = {
			tag: {
				content : '<li class="selected_tag" itemvalue="#item_value#">#item_text#<span class="tag_close"><i class="sp_icon_font if-close"></i></span></li>',
				textKey : '#item_text#',
				valueKey : '#item_value#'
			},
            page: {
			    current: 'page_num',
                total: 'page_count'
            },
            msg :{
			    maxSelectLimit: 'max_selected_limit'
            }
		};
	};

    /**
     * Get the actual width/height of invisible DOM elements with jQuery.
     * Source code come from dreamerslab/jquery.actual
     * @param element
     * @param method
     * @returns {*}
     */
    SelectPage.prototype.elementRealSize = function(element, method){
        var defaults = {
            absolute       : false,
            clone          : false,
            includeMargin : false,
            display        : 'block'
        };
        var configs = defaults, $target = element.eq( 0 ),fix, restore,tmp = [], style = '', $hidden;

        fix = function (){
            // get all hidden parents
            $hidden = $target.parents().addBack().filter( ':hidden' );
            style   += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

            if( configs.absolute === true ) style += 'position: absolute !important;';

            // save the origin style props
            // set the hidden el css to be got the actual value later
            $hidden.each( function (){
                // Save original style. If no style was set, attr() returns undefined
                var $this = $( this ), thisStyle = $this.attr( 'style' );
                tmp.push( thisStyle );
                // Retain as much of the original style as possible, if there is one
                $this.attr( 'style', thisStyle ? thisStyle + ';' + style : style );
            });
        };

        restore = function (){
            // restore origin style values
            $hidden.each( function ( i ){
                var $this = $( this ), _tmp  = tmp[ i ];

                if( _tmp === undefined ) $this.removeAttr( 'style' );
                else $this.attr( 'style', _tmp );
            });
        };

        fix();
        // get the actual value with user specific methed
        // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
        // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
        var actual = /(outer)/.test( method ) ?
            $target[ method ]( configs.includeMargin ) :
            $target[ method ]();

        restore();
        // IMPORTANT, this plugin only return the value of the first element
        return actual;
    };

	/**
	 * Dom building
	 * @param {Object} combo_input - original input element
	 */
	SelectPage.prototype.setElem = function(combo_input) {
		// 1. build Dom object
		var elem = {}, p = this.option, css = this.css_class, msg = this.message, input = $(combo_input);
		
		var orgWidth = input.outerWidth();
		// fix input width in hidden situation
		if(orgWidth <= 0) orgWidth = this.elementRealSize(input, 'outerWidth');
		if(orgWidth < 150) orgWidth = 150;
		
		var namePrefix = '_text',
	    input_id = input.attr('id') || input.attr('name'),
	    input_name = input.attr('name') || 'selectPage',
	    hidden_name = input_name,
	    hidden_id = input_id;
		
		elem.combo_input = $('<input type="text" />')
			.attr({'autocomplete':'off',
				'readonly':'readonly',
				'placeholder':input.attr('placeholder')
				})
			.addClass(css.input)
			.val(input.val());
		
		elem.hidden = input.attr({
			name: hidden_name,
			id: hidden_id
		}).addClass("sp_hidden");
		
		input.hide();
		
		if(p.selectOnly) elem.combo_input.prop('readonly',true);
		input.wrap('<div>');
        elem.container = input.parent().addClass(css.container);
		if(input.prop('disabled')) {
		    if(p.multiple) elem.container.addClass(css.disabled);
            else elem.combo_input.addClass(css.input_off);
        }
		

        // set outer box width
		elem.container.width("100%");

		elem.button = $('<div style="font-size: 24px;">').addClass(css.button);
		//drop down button
		elem.dropdown = $('<i class="sp_icon_font if-caret-bottom"></i>');
		//clear button 'X' in single mode
		elem.clear_btn = $('<div>').html($('<i>').addClass('sp_icon_font if-close')).addClass(css.clear_btn).attr('title', msg.clear);
		if(!p.dropButton) elem.clear_btn.addClass(css.align_right);
		
		//main box in multiple mode
		elem.element_box = $('<ul>').addClass(css.element_box);
		if(p.multiple && p.multipleControlbar)
			elem.control = $('<div>').addClass(css.control_box);
		//result list box
		elem.result_area = $('<div>').addClass(css.re_area);
		elem.search_input = $('<input>').addClass(css.search_input);
		//pagination bar
        if(p.pagination) elem.navi = $('<div>').addClass('sp_pagination').append('<ul>');
		elem.results = $('<ul>').addClass(css.results);
		
        
		elem.combo_input.attr({
			name: input_name + namePrefix,
			id: input_id + namePrefix
		});

		// 2. DOM element put
		//elem.container.append(elem.hidden);
		elem.container.prepend(elem.combo_input);
		if(p.dropButton){
            elem.container.append(elem.button)
            elem.button.append(elem.dropdown);
        }
		$(document.body).append(elem.result_area);
		elem.result_area.append(elem.search_input);
		elem.result_area.append(elem.results);
        if(p.pagination) elem.result_area.append(elem.navi);
		
		//Multiple select mode
		if(p.multiple){
			if(p.multipleControlbar){
				elem.control.append('<button type="button" class="btn btn-default sp_clear_all" ><i class="sp_icon_font if-clear"></i></button>');
				elem.control.append('<button type="button" class="btn btn-default sp_unselect_all" ><i class="sp_icon_font if-unselect-all"></i></button>');
				elem.control.append('<button type="button" class="btn btn-default sp_select_all" ><i class="sp_icon_font if-select-all"></i></button>');
				elem.control_text = $('<p>');
                elem.control.append(elem.control_text);
				elem.result_area.prepend(elem.control);
			}				
			elem.container.addClass('sp_container_combo');
			elem.combo_input.addClass('sp_combo_input').before(elem.element_box);
			var li = $('<li>').addClass('input_box');
			li.append(elem.combo_input);
			elem.element_box.append(li);
			if(elem.combo_input.attr('placeholder')) elem.combo_input.attr('placeholder_bak',elem.combo_input.attr('placeholder'));
		}

		this.elem = elem;
	};

	/**
	 * Drop down button set to default
	 */
	SelectPage.prototype.setButtonAttrDefault = function() {
	    /*
		if (this.option.selectOnly) {
			if ($(this.elem.combo_input).val() !== '') {
				if ($(this.elem.hidden).val() !== '') {
					//选择条件
					$(this.elem.combo_input).attr('title', this.message.select_ok).removeClass(this.css_class.select_ng).addClass(this.css_class.select_ok);
				} else {
					//输入方式
					$(this.elem.combo_input).attr('title', this.message.select_ng).removeClass(this.css_class.select_ok).addClass(this.css_class.select_ng);
				}
			} else {
				$(this.elem.hidden).val('');
				$(this.elem.combo_input).removeAttr('title').removeClass(this.css_class.select_ng);
			}
		}
		*/
		//this.elem.button.attr('title', this.message.get_all_btn);
        if(this.option.dropButton)
		    this.elem.button.attr('title', this.message.close_btn);
	};

	/**
	 * Set item need selected after init
     * set selected item ways:
     * <input value="key">
     * <input data-init="key">
	 */
	SelectPage.prototype.setInitRecord = function(refresh) {
		var self = this, p = self.option, el = self.elem, key = '';
        if($.type(el.combo_input.data('init')) != 'undefined')
            p.initRecord = String(el.combo_input.data('init'));
        //data-init and value attribute can be init plugin selected item
        //but, if set data-init and value attribute in the same time, plugin will choose data-init attribute first
        if(!refresh && !p.initRecord && el.combo_input.val())
            p.initRecord = el.combo_input.val();
        el.combo_input.val('');
        if(!refresh) el.hidden.val(p.initRecord);
        key = refresh && el.hidden.val() ? el.hidden.val() : p.initRecord;
		if(key){
			if (typeof p.data === 'object') {
				var data = new Array();
				var keyarr = key.split(',');
				$.each(keyarr,function(index,row){
					for (var i = 0; i < p.data.length; i++) {
						if (p.data[i][p.keyField] == row) {
							data.push(p.data[i]);
							break;
						}
					}
				});
				if(!p.multiple && data.length > 1) data = [data[0]];
				self.afterInit(self, data);
			} else {//ajax data source mode to init selected item
				$.ajax({
					dataType: 'json',
                    type: 'POST',
					url: p.data,
					data: {
						searchTable: p.dbTable,
						searchKey: p.keyField,
						searchValue: key
					},
					success: function(json) {
					    var d = null;
					    if(p.eAjaxSuccess && $.isFunction(p.eAjaxSuccess))
					        d = p.eAjaxSuccess(json);
						self.afterInit(self, d.list);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						self.ajaxErrorNotify(self, errorThrown);
					}
				});
			}
		}
	};

	/**
	 * Selected item set to plugin
	 * @param {Object} self
	 * @param {Object} data - selected item data
	 */
	SelectPage.prototype.afterInit = function(self, data) {
		if(!data || ($.isArray(data) && data.length === 0)) return;
		if(!$.isArray(data)) data = [data];
		var p = self.option, css = self.css_class;

		var getText = function(row){
            var text = row[p.showField];
            if(p.formatItem && $.isFunction(p.formatItem)){
                try{
                    text = p.formatItem(row);
                }catch(e){}
            }
            return text;
        };
		
		if(p.multiple){
		    self.prop.init_set = true;
			self.clearAll(self);
			$.each(data,function(i,row){
				var item = {text:getText(row),value:row[p.keyField]};
				if(!self.isAlreadySelected(self,item)) self.addNewTag(self,item);
			});
			self.tagValuesSet(self);
			self.inputResize(self);
            self.prop.init_set = false;
		}else{
			var row = data[0];
			self.elem.combo_input.val(getText(row));
            self.elem.combo_input.attr('title',getText(row));
            //self.elem.combo_input[0].title = getText(row);
			self.elem.hidden.val(row[p.keyField]);
			self.prop.prev_value = getText(row);
            self.prop.selected_text = getText(row);
			if (p.selectOnly) {
				self.elem.combo_input.attr('title', self.message.select_ok).removeClass(css.select_ng).addClass(css.select_ok);
			}
			self.putClearButton();
		}
	};

	/**
	 * Drop down button event bind
	 */
	SelectPage.prototype.eDropdownButton = function() {
		var self = this;
		if(self.option.dropButton){
            self.elem.button.mouseup(function(ev) {
                ev.stopPropagation();
                if (self.elem.result_area.is(':hidden') && !self.elem.combo_input.prop('disabled')) {
                    self.elem.combo_input.focus();
                } else self.hideResults(self);
            });
        }
	};

	/**
	 * Events bind
	 */
	SelectPage.prototype.eInput = function() {
		var self = this,p = self.option, el = self.elem, msg = self.message;
		var showList = function(){
			self.prop.page_move = false;
			self.suggest(self);
			self.setCssFocusedInput(self);
		};
		el.combo_input.keyup(function(e) {
			self.processKey(self, e);
		}).keydown(function(e) {
            self.processControl(self, e);
        }).focus(function(e) {
			//When focus on input, show the result list
			if (el.result_area.is(':hidden')) {
				e.stopPropagation();
				self.prop.first_show = true;
				showList();
			}
		});
		
		el.search_input.keyup(function(e) {
			self.processKey(self, e);
		}).keydown(function(e) {
            		self.processControl(self, e);
		});
		el.container.on('click.SelectPage','div.'+self.css_class.clear_btn,function(e){
            e.stopPropagation();
            if(!self.disabled(self)){
                self.elem.combo_input.attr('title','');
                self.clearAll(self);
                if(p.eClear && $.isFunction(p.eClear)) p.eClear(self);
            }
        });
		el.result_area.on('mousedown.SelectPage',function(e){
		    e.stopPropagation();
        });
		if(p.multiple){
			if(p.multipleControlbar){
				//Select all item of current page
                el.control.find('.sp_select_all').on('click.SelectPage',function(e){
					self.selectAllLine(self);
				}).hover(function(){
				    el.control_text.html(msg.select_all);
                },function(){
                    el.control_text.html('');
                });
				//Cancel select all item of current page
                el.control.find('.sp_unselect_all').on('click.SelectPage',function(e){
					self.unSelectAllLine(self);
				}).hover(function(){
                    el.control_text.html(msg.unselect_all);
                },function(){
                    el.control_text.html('');
                });
				//Clear all selected item
                el.control.find('.sp_clear_all').on('click.SelectPage',function(e){
					self.clearAll(self);
				}).hover(function(){
                    el.control_text.html(msg.clear_all);
                },function(){
                    el.control_text.html('');
                });
			}
			el.element_box.on('click.SelectPage',function(e){
				var srcEl = e.target || e.srcElement;
				if($(srcEl).is('ul')) el.combo_input.focus();
			});
			//Tag close
			el.element_box.on('click.SelectPage','span.tag_close',function(){
				var li = $(this).closest('li');
				self.removeTag(self,li);
				showList();
				if(p.eTagRemove && $.isFunction(p.eTagRemove))
					p.eTagRemove(1, self);
			});
			self.inputResize(self);
		}
	};

	/**
	 * Out of plugin area click event handler
	 */
	SelectPage.prototype.eWhole = function() {
		var self = this, css = self.css_class;
        var cleanContent = function(obj){
            obj.elem.combo_input.val('');
            if(!obj.option.multiple) obj.elem.hidden.val('');
            obj.prop.selected_text = '';
        };

		//Out of plugin area
		$(document.body).off('mousedown.selectPage').on('mousedown.selectPage',function(e) {
            var ele = e.target || e.srcElement;
            var sp = $(ele).closest('div.' + css.container);
            //Open status result list
            var openStatusContainer = $('div.' + css.container + '.' + css.container_open);
            openStatusContainer.each(function(){
                if(this == sp[0]) return;
                var $this = $(this), d = $this.find('input.sp_hidden').data(SelectPage.dataKey);

                if(!d.elem.combo_input.val() && d.elem.hidden.val() && !d.option.multiple){
                    d.prop.current_page = 1;//reset page to 1
                    cleanContent(d);
                    d.hideResults(d);
                    return true;
                }
                if (d.elem.results.find('li').not('.'+css.message_box).size()) {
                    if(d.option.autoFillResult) {
                        //have selected item, then hide result list
                        if (d.elem.hidden.val()) d.hideResults(d);
                        else if(d.elem.results.find('li.sp_over').size()){
                            //no one selected and have highlight item, select the highlight item
                            d.selectCurrentLine(d, true);
                        }else if(d.option.autoSelectFirst){
                            //no one selected, no one highlight, select the first item
                            d.nextLine(d);
                            d.selectCurrentLine(d, true);
                        }else d.hideResults(d);
                    }else d.hideResults(d);
                } else {
                    //when no one item match, clear search keywords
                    if (d.option.noResultClean) cleanContent(d);
                    else{
                        if(!d.option.multiple) d.elem.hidden.val('');
                    }
                    d.hideResults(d);
                }
            });
		});
	};

	/**
	 * Result list event bind
	 */
	SelectPage.prototype.eResultList = function() {
		var self = this, css = this.css_class;
		self.elem.results.children('li').hover(function() {
			if (self.prop.key_select) {
				self.prop.key_select = false;
				return;
			}
			if(!$(this).hasClass(css.selected) && !$(this).hasClass(css.message_box)){
                $(this).addClass(css.select);
                self.setCssFocusedResults(self);
            }
		},function(){
		    $(this).removeClass(css.select);
        }).click(function(e) {
			if (self.prop.key_select) {
				self.prop.key_select = false;
				return;
			}
			e.preventDefault();
			e.stopPropagation();

            if(!$(this).hasClass(css.selected)) self.selectCurrentLine(self, false);
		});
	};

    /**
     * Reposition result list when list beyond the visible area
     */
	SelectPage.prototype.eScroll = function(){
	    var self = this, css = this.css_class;
	    $(window).on('scroll.SelectPage',function(e){
            $('div.' + css.container + '.' + css.container_open).each(function(){
                var $this = $(this), d = $this.find('input.sp_hidden').data(SelectPage.dataKey),
                    offset = d.elem.result_area.offset(),
                    screenScrollTop = $(window).scrollTop(),
                    docHeight = $(document).height(),
                    viewHeight = $(window).height(),
                    listHeight = d.elem.result_area.outerHeight(),
                    listBottom = offset.top + listHeight,
                    hasOverflow = docHeight > viewHeight,
                    down = d.elem.result_area.hasClass('shadowDown');
                if(hasOverflow){
                    if(down){//open down
                        if(listBottom > (viewHeight + screenScrollTop)) d.calcResultsSize(d);
                    }else{//open up
                        if(offset.top < screenScrollTop) d.calcResultsSize(d);
                    }
                }
            });
        });
    };

	/**
	 * Page bar button event bind
	 */
	SelectPage.prototype.ePaging = function() {
		var self = this;
		if(!self.option.pagination) return;
        self.elem.navi.find('li.csFirstPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.firstPage(self);
		});

        self.elem.navi.find('li.csPreviousPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.prevPage(self);
		});

        self.elem.navi.find('li.csNextPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.nextPage(self);
		});

        self.elem.navi.find('li.csLastPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.lastPage(self);
		});
	};

	/**
	 * Ajax request fail
	 * @param {Object} self
	 * @param {string} errorThrown
	 */
	SelectPage.prototype.ajaxErrorNotify = function(self, errorThrown) {
		self.showMessage(self.message.ajax_error);
	};
	
	/**
	 * Message box
	 * @param {Object} self
	 * @param msg {string} the text need to show
	 */
	SelectPage.prototype.showMessage = function(self,msg){
		if(!msg) return;
		var msgLi = '<li class="'+self.css_class.message_box+'"><i class="sp_icon_font if-warning"></i> '+msg+'</li>';
		self.elem.results.empty().append(msgLi).show();
		self.calcResultsSize(self);
		self.setOpenStatus(self, true);
		self.elem.control.hide();
		if(self.option.pagination) self.elem.navi.hide();
	};

	/**
	 * @desc Scroll
	 * @param {Object} self
	 * @param {boolean} enforce
	 */
	SelectPage.prototype.scrollWindow = function(self, enforce) {
		var current_result = self.getCurrentLine(self),
            target_top = (current_result && !enforce) ? current_result.offset().top: self.elem.container.offset().top,
            target_size;

		self.prop.size_li = self.elem.results.children('li:first').outerHeight();
		target_size = self.prop.size_li;
		
		var gap, client_height = $(window).height(),
            scroll_top = $(window).scrollTop(),
            scroll_bottom = scroll_top + client_height - target_size;
		if (current_result.length) {
			if (target_top < scroll_top || target_size > client_height) {
				//scroll to top
				gap = target_top - scroll_top;
			} else if (target_top > scroll_bottom) {
				//scroll down
				gap = target_top - scroll_bottom;
			} else return; //do not scroll
		} else if (target_top < scroll_top) gap = target_top - scroll_top;
		window.scrollBy(0, gap);
	};
    /**
     * change css class by status
     * @param self
     * @param status {boolean} true: open, false: close
     */
	SelectPage.prototype.setOpenStatus = function(self, status){
	    var el = self.elem, css = self.css_class;
	    if(status){
            el.container.addClass(css.container_open);
            el.result_area.addClass(css.result_open);
        }else{
            el.container.removeClass(css.container_open);
            el.result_area.removeClass(css.result_open);
        }
    };

	/**
	 * input element in focus css class set
	 * @param {Object} self
	 */
	SelectPage.prototype.setCssFocusedInput = function(self) {
		//$(self.elem.results).addClass(self.css_class.re_off);
		//$(self.elem.combo_input).removeClass(self.css_class.input_off);
	};

	/**
     * set result list get focus and input element lost focus
	 * @param {Object} self
	 */
	SelectPage.prototype.setCssFocusedResults = function(self) {
		//$(self.elem.results).removeClass(self.css_class.re_off);
		//$(self.elem.combo_input).addClass(self.css_class.input_off);
	};

	/**
	 * Quick search input keywords listener
	 * @param {Object} self
	 */
	SelectPage.prototype.checkValue = function(self) {
		var now_value = self.elem.search_input.val();
		if (now_value != self.prop.prev_value) {
			self.prop.prev_value = now_value;
			self.prop.first_show = false;

			if(self.option.selectOnly) self.setButtonAttrDefault();
            if(!self.option.multiple && !now_value){
                //self.elem.combo_input.val('');
                //self.elem.hidden.val('');
                //self.elem.clear_btn.remove();
            }

			self.suggest(self);
		}
	};

    /**
     * Input handle（regular input）
     * @param {Object} self
     * @param {Object} e - event object
     */
    SelectPage.prototype.processKey = function(self, e) {
        if($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9, 13]) === -1){
            if(e.keyCode != 16) self.setCssFocusedInput(self); // except Shift(16)
            self.inputResize(self);
            if($.type(self.option.data) === 'string'){
                self.prop.last_input_time = e.timeStamp;
                setTimeout(function(){
                    if((e.timeStamp - self.prop.last_input_time) === 0)
                        self.checkValue(self);
                },self.option.inputDelay * 1000);
            }else{
                self.checkValue(self);
            }
        }
    }

	/**
	 * Input handle（control key）
	 * @param {Object} self
	 * @param {Object} e - event object
	 */
	SelectPage.prototype.processControl = function(self, e) {
		if (($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9]) > -1 && self.elem.result_area.is(':visible')) ||
			($.inArray(e.keyCode, [13, 9]) > -1 && self.getCurrentLine(self))) {
			e.preventDefault();
			e.stopPropagation();
			e.cancelBubble = true;
			e.returnValue = false;
			switch (e.keyCode) {
			case 37:// left
				if (e.shiftKey) self.firstPage(self);
				else self.prevPage(self);
				break;
			case 38:// up
				self.prop.key_select = true;
				self.prevLine(self);
				break;
			case 39:// right
				if (e.shiftKey) self.lastPage(self);
				else self.nextPage(self);
				break;
			case 40:// down
				if (self.elem.results.children('li').length) {
					self.prop.key_select = true;
					self.nextLine(self);
				} else self.suggest(self);
				break;
			case 9:// tab
				self.prop.key_paging = true;
				self.selectCurrentLine(self, true);
				//self.hideResults(self);
				break;
			case 13:// return
				self.selectCurrentLine(self, true);
				break;
			case 27://  escape
				self.prop.key_paging = true;
				self.hideResults(self);
				break;
			}
		}
	};

	/**
	 * Abort Ajax request
	 * @param {Object} self
	 */
	SelectPage.prototype.abortAjax = function(self) {
		if (self.prop.xhr) {
			self.prop.xhr.abort();
			self.prop.xhr = false;
		}
	};

	/**
	 * Suggest result of search keywords
	 * @param {Object} self
	 */
	SelectPage.prototype.suggest = function(self) {
		var q_word, val = $.trim(self.elem.search_input.val());
        if(self.option.multiple) q_word = val;
        else{
            if(val && val === self.prop.selected_text) q_word = '';
            else q_word = val;
        }
		q_word = q_word.split(/[\s　]+/);

        //Before show up result list callback
        if(self.option.eOpen && $.isFunction(self.option.eOpen))
            self.option.eOpen.call(self);

		self.abortAjax(self);
		//self.setLoading(self);
		var which_page_num = self.prop.current_page || 1;
		
		if (typeof self.option.data == 'object') self.searchForJson(self, q_word, which_page_num);
		else self.searchForDb(self, q_word, which_page_num);
	};

	/**
	 * Loading
	 * @param {Object} self
	 */
	SelectPage.prototype.setLoading = function(self) {
		if (self.elem.results.html() === '') {
			//self.calcResultsSize(self);
			self.setOpenStatus(self, true);
		}
	};

	/**
	 * Search for ajax
	 * @param {Object} self
	 * @param {Array} q_word - query keyword
	 * @param {number} which_page_num - target page number
	 */
	SelectPage.prototype.searchForDb = function(self, q_word, which_page_num) {
	    var p = self.option;
		if(!p.eAjaxSuccess || !$.isFunction(p.eAjaxSuccess)) self.hideResults(self);
		var _paramsFunc = p.params, _params = {}, searchKey = p.searchField;
		//when have new query keyword, then reset page number to 1.
		if(q_word.length && q_word[0] && q_word[0] !== self.prop.prev_value) which_page_num = 1;
		var _orgParams = {
			q_word: q_word,
			pageNumber: which_page_num,
			pageSize: p.pageSize,
			andOr: p.andOr,
			orderBy: p.orderBy,
			searchTable: p.dbTable
		};
        _orgParams[searchKey] = q_word[0];
		if (_paramsFunc && $.isFunction(_paramsFunc)) {
			var result = _paramsFunc.call(self);
			if (result && $.isPlainObject(result)) {
				_params = $.extend({}, _orgParams, result);
			} else _params = _orgParams;
		} else _params = _orgParams;
		self.prop.xhr = $.ajax({
			dataType: 'json',
			url: p.data,
			type: 'POST',
			data: _params,
			success: function(returnData) {
				if (!returnData || !$.isPlainObject(returnData)) {
					self.hideResults(self);
					self.ajaxErrorNotify(self, errorThrown);
					return;
				}
				var data = {}, json = {};
				try{
                    data = p.eAjaxSuccess(returnData);
                    json.originalResult = data.list;
                    json.cnt_whole = data.totalRow;
                }catch(e){
                    self.showMessage(self, self.message.ajax_error);
                    return;
                }

				json.candidate = [];
				json.keyField = [];
				if (typeof json.originalResult != 'object') {
					self.prop.xhr = null;
					self.notFoundSearch(self);
					return;
				}
				json.cnt_page = json.originalResult.length;
				for (var i = 0; i < json.cnt_page; i++) {
					for (var key in json.originalResult[i]) {
						if (key == p.keyField) {
							json.keyField.push(json.originalResult[i][key]);
						}
						if (key == p.showField) {
							json.candidate.push(json.originalResult[i][key]);
						}
					}
				}
				self.prepareResults(self, json, q_word, which_page_num);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if (textStatus != 'abort') {
					self.hideResults(self);
					self.ajaxErrorNotify(self, errorThrown);
				}
			},
			complete: function() {
				self.prop.xhr = null;
			}
		});
	};

	/**
	 * Search for json data source
	 * @param {Object} self
	 * @param {Array} q_word
	 * @param {number} which_page_num
	 */
	SelectPage.prototype.searchForJson = function(self, q_word, which_page_num) {
		var p = self.option, matched = [], esc_q = [], sorted = [], json = {}, i = 0, arr_reg = [];
		
		//query keyword filter
		do {
			//'/\W/g'正则代表全部不是字母，数字，下划线，汉字的字符
			//将非法字符进行转义
			esc_q[i] = q_word[i].replace(/\W/g, '\\$&').toString();
			arr_reg[i] = new RegExp(esc_q[i], 'gi');
			i++;
		} while ( i < q_word.length );

		// SELECT * FROM data WHERE field LIKE q_word;
		for (i = 0; i < p.data.length; i++) {
			var flag = false, row = p.data[i], itemText;
			for (var j = 0; j < arr_reg.length; j++) {					
				itemText = row[p.searchField];
				if(p.formatItem && $.isFunction(p.formatItem))
					itemText = p.formatItem(row);
				if (itemText.match(arr_reg[j])) {
					flag = true;
                    itemText = this.markMatch(itemText,q_word[j]);
                    row[p.searchField] = itemText;
					if (p.andOr == 'OR') break;
				} else {
					flag = false;
					if (p.andOr == 'AND') break;
				}
			}
			if (flag) matched.push(row);
		}
		
		// (CASE WHEN ...) then く order some column
		var reg1 = new RegExp('^' + esc_q[0] + '$', 'gi'),
            reg2 = new RegExp('^' + esc_q[0], 'gi'),
            matched1 = [], matched2 = [], matched3 = [];
		for (i = 0; i < matched.length; i++) {
		    var orderField = p.orderBy[0][0];
            var orderValue = String(matched[i][orderField]);
			if (orderValue.match(reg1)) {
				matched1.push(matched[i]);
			} else if (orderValue.match(reg2)) {
				matched2.push(matched[i]);
			} else {
				matched3.push(matched[i]);
			}
		}

		if (p.orderBy[0][1].match(/^asc$/i)) {
			matched1 = self.sortAsc(self, matched1);
			matched2 = self.sortAsc(self, matched2);
			matched3 = self.sortAsc(self, matched3);
		} else {
			matched1 = self.sortDesc(self, matched1);
			matched2 = self.sortDesc(self, matched2);
			matched3 = self.sortDesc(self, matched3);
		}
		sorted = sorted.concat(matched1).concat(matched2).concat(matched3);

        //sorted = self.option.data;
        /*
        if (sorted.length === undefined || sorted.length === 0 ) {
            self.notFoundSearch(self);
            return;
        }
        */
        json.cnt_whole = sorted.length;
        //page_move used to distinguish between init plugin or page moving
		if(!self.prop.page_move){
			//only single mode can be used page number relocation
			if(!p.multiple){
                //get selected item belong page number
				var currentValue = self.elem.hidden.val();
				if($.type(currentValue) !== 'undefined' && $.trim(currentValue) !== ''){
					var index = 0;
					$.each(sorted,function(i,row){
						if(row[p.keyField] == currentValue){
							index = i + 1;
							return false;
						}
					});
					which_page_num = Math.ceil(index / p.pageSize);
					if(which_page_num < 1) which_page_num = 1;
					self.prop.current_page = which_page_num;
				}
			}
		}else{
            //set page number to 1 when result number less then page size
			if(sorted.length <= ((which_page_num - 1) * p.pageSize)){
				which_page_num = 1;
				self.prop.current_page = 1;
			}
		}
		
		//LIMIT xx OFFSET xx
		var start = (which_page_num - 1) * p.pageSize, end = start + p.pageSize;
		//save original data
		json.originalResult = [];
		//after data filter handle
		for (i = start; i < end; i++) {
			if (sorted[i] === undefined) break;
			json.originalResult.push(sorted[i]);
			for (var key in sorted[i]) {
				if (key == p.keyField) {
					if (json.keyField === undefined) json.keyField = [];
					json.keyField.push(sorted[i][key]);
				}
				if (key == p.showField) {
					if (json.candidate === undefined) json.candidate = [];
					json.candidate.push(sorted[i][key]);
				}
			}
		}

		if (json.candidate === undefined) json.candidate = [];
		json.cnt_page = json.candidate.length;
		self.prepareResults(self, json, q_word, which_page_num);
	};

	/**
     * Set order asc
	 * @param {Object} self
	 * @param {Array} arr - result array
	 */
	SelectPage.prototype.sortAsc = function(self, arr) {
		arr.sort(function(a, b) {
		    var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valA - valB : String(valA).localeCompare(String(valB));
		});
		return arr;
	};

	/**
	 * Set order desc
	 * @param {Object} self
	 * @param {Array} arr - result array
	 */
	SelectPage.prototype.sortDesc = function(self, arr) {
		arr.sort(function(a, b) {
            var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valB - valA : String(valB).localeCompare(String(valA));
		});
		return arr;
	};

	/**
	 * Not result found handle
	 * @param {Object} self
	 */
	SelectPage.prototype.notFoundSearch = function(self) {
		self.elem.results.empty();
		self.calcResultsSize(self);
		self.setOpenStatus(self, true);
		self.setCssFocusedInput(self);
	};

	/**
	 * Prepare data to show
	 * @param {Object} self
	 * @param {Object} json - data result
	 * @param {Array} q_word - query keyword
	 * @param {number} which_page_num - target page number
	 */
	SelectPage.prototype.prepareResults = function(self, json, q_word, which_page_num) {
		if(self.option.pagination) self.setNavi(self, json.cnt_whole, json.cnt_page, which_page_num);

		if (!json.keyField) json.keyField = false;

		if (self.option.selectOnly && json.candidate.length === 1 && json.candidate[0] == q_word[0]) {
			self.elem.hidden.val(json.keyField[0]);
			this.setButtonAttrDefault();
		}
		var is_query = false;
		if (q_word && q_word.length && q_word[0]) is_query = true;
		self.displayResults(self, json, is_query);
	};

	/**
	 * Build page bar
	 * @param {Object} self
	 * @param {number} cnt_whole - total record count
	 * @param {number} cnt_page
	 * @param {number} page_num - current page number
	 */
	SelectPage.prototype.setNavi = function(self, cnt_whole, cnt_page, page_num) {
	    var msg = self.message;
		/**
		 * build pagination bar
		 */
		var buildPageNav = function(self, pagebar, page_num, last_page) {
		    var updatePageInfo = function(){
                var pageInfo = msg.page_info;
                return pageInfo.replace(self.template.page.current, page_num).replace(self.template.page.total, last_page);
            };
			if (pagebar.find('li').size() === 0) {
				pagebar.hide().empty();
				var iconFist='sp_icon_font if-first',
                    iconPrev='sp_icon_font if-previous',
                    iconNext='sp_icon_font if-next',
                    iconLast='sp_icon_font if-last';

				pagebar.append('<li class="csFirstPage" title="' + msg.first_title + '" ><a href="javascript:void(0);"> <i class="'+iconFist+'" ></i> </a></li>');
				pagebar.append('<li class="csPreviousPage" title="' + msg.prev_title + '" ><a href="javascript:void(0);"><i class="'+iconPrev+'"></i></a></li>');
				//pagination information
				pagebar.append('<li class="pageInfoBox"><a href="javascript:void(0);"> ' + updatePageInfo() + ' </a></li>');

				pagebar.append('<li class="csNextPage" title="' + msg.next_title + '" ><a href="javascript:void(0);"><i class="'+iconNext+'"></i></a></li>');
				pagebar.append('<li class="csLastPage" title="' + msg.last_title + '" ><a href="javascript:void(0);"> <i class="'+iconLast+'"></i> </a></li>');
                pagebar.show();
			}else{
                pagebar.find('li.pageInfoBox a').html(updatePageInfo());
            }
		};

		var pagebar = self.elem.navi.find('ul'),
            last_page = Math.ceil(cnt_whole / self.option.pageSize); //calculate total page
		if(last_page === 0) page_num = 0;
		else{
			if(last_page < page_num) page_num = last_page;
			else if(page_num === 0) page_num = 1;
		}
		self.prop.current_page = page_num;//update current page number
        self.prop.max_page = last_page;//update page count
		buildPageNav(self, pagebar, page_num, last_page);

		//update paging status
		var dClass = 'disabled',
            first = pagebar.find('li.csFirstPage'),
            previous = pagebar.find('li.csPreviousPage'),
            next = pagebar.find('li.csNextPage'),
            last = pagebar.find('li.csLastPage');
		//first and previous
		if (page_num === 1 || page_num === 0) {
			if (!first.hasClass(dClass)) {
				first.addClass(dClass);
				first.find('i').css('color','#DDDDDD');
			}
			if (!previous.hasClass(dClass)) {
				previous.addClass(dClass);
				previous.find('i').css('color','#DDDDDD');
			}
		} else {
			if (first.hasClass(dClass)) {
				first.removeClass(dClass);
				first.find('i').css('color','');
			}
			if (previous.hasClass(dClass)) {
				previous.removeClass(dClass);
				previous.find('i').css('color','');
			}
		}
		//next and last
		if (page_num === last_page || last_page === 0) {
			if (!next.hasClass(dClass)) {
				next.addClass(dClass);
				next.find('i').css('color','#DDDDDD');
			}
			if (!last.hasClass(dClass)) {
				last.addClass(dClass);
				last.find('i').css('color','#DDDDDD');
			}
		} else {
			if (next.hasClass(dClass)) {
				next.removeClass(dClass);
				next.find('i').css('color','');
			}
			if (last.hasClass(dClass)) {
				last.removeClass(dClass);
				last.find('i').css('color','');
			}
		}

		if (last_page > 1) self.ePaging(); //pagination event bind
	};

	/**
	 * Render result list
	 * @param {Object} self
	 * @param {Object} json - result data
	 * @param {boolean} is_query - used to different from search to open and just click to open
	 */
	SelectPage.prototype.displayResults = function(self, json, is_query) {
	    var p = self.option, el = self.elem;
		el.results.hide().empty();
		if(p.multiple && $.type(p.maxSelectLimit) === 'number' && p.maxSelectLimit > 0){
			var selectedSize = el.element_box.find('li.selected_tag').size();
			if(selectedSize > 0 && selectedSize >= p.maxSelectLimit){
			    var msg = self.message.max_selected;
				self.showMessage(self, msg.replace(self.template.msg.maxSelectLimit, p.maxSelectLimit));
				return;
			}
		}

		if(json.candidate.length){
            var arr_candidate = json.candidate,
                arr_primary_key = json.keyField,
                keystr = el.hidden.val(),
                keyArr = keystr ? keystr.split(',') : new Array(),
                itemText = '';
            for (var i = 0; i < arr_candidate.length; i++) {
                /*if(p.formatItem && $.isFunction(p.formatItem)){
                    try {
                        itemText = p.formatItem(json.originalResult[i]);
                    } catch (e) {
                        console.error('formatItem内容格式化函数内容设置不正确！');
                        itemText = arr_candidate[i];
                    }
                }else*/
                itemText = arr_candidate[i];
                var list = $('<li>').html(itemText).attr({
                    pkey: arr_primary_key[i]
                });
                if(!p.formatItem) list.attr('title', itemText);

                //Set selected item highlight
                if ($.inArray(arr_primary_key[i].toString(),keyArr) !== -1) {
                    list.addClass(self.css_class.selected);
                }
                //cache item data
                list.data('dataObj',json.originalResult[i]);
                el.results.append(list);
            }
        }else{
		    var li = '<li class="'+self.css_class.message_box+'"><i class="sp_icon_font if-warning"></i> '+
                self.message.not_found + '</li>';
            el.results.append(li);
        }
        el.results.show();

        if(p.multiple && p.multipleControlbar) el.control.show();
		if(p.pagination) el.navi.show();
		self.calcResultsSize(self);
		self.setOpenStatus(self, true);
		
		//Result item event bind
		self.eResultList();
		//scrolling listen
		self.eScroll();
        //auto highlight first item in search, have result and set autoSelectFirst to true situation
		if (is_query && json.candidate.length && p.autoSelectFirst) self.nextLine(self);
	};

	/**
	 * Calculate result list size and position
	 * @param {Object} self
	 */
	SelectPage.prototype.calcResultsSize = function(self) {
	    var p = self.option, el = self.elem;
	    var rePosition = function(){
            if (el.container.css('position') === 'static') {
                // position: static
                var offset = el.combo_input.offset();
                el.result_area.css({
                    top: offset.top + el.combo_input.outerHeight() + 'px',
                    left: offset.left + 'px'
                });
            } else {
                if(!p.pagination){
                    var itemHeight = el.results.find('li:first').outerHeight(true),
                        listHeight = itemHeight * p.listSize;
                    el.results.css({
                        'max-height':listHeight,
                        'overflow-y':'auto'
                    });
                }

                //handle result list show up side(left, right, up or down)
                var docWidth = $(document).width(),
                    docHeight = $(document).height(),//the document full height
                    viewHeight = $(window).height(),//browser visible area height
                    offset = el.container.offset(),
                    screenScrollTop = $(window).scrollTop(),
                    listWidth = el.result_area.outerWidth(),
                    //result list height
                    listHeight = el.result_area.outerHeight(),
                    //default left used input element left
                    defaultLeft = offset.left,//p.multiple ? -1 : 0;
                    //input element height
                    inputHeight = el.container.outerHeight(),
                    left = (offset.left + listWidth) > docWidth ?
                        defaultLeft - (listWidth - el.container.outerWidth()) :
                        defaultLeft,
                    //the actual top coordinate of input element(outer div)
                    screenTop = offset.top,//$(el.container).scrollTop();//offset.top - screenScrollTop;
                    top = 0,dist = -1,//set distance between input element and result list
                    //the actual top coordinate of result list
                    listBottom = screenTop + inputHeight + listHeight + dist,
                    hasOverflow = docHeight > viewHeight;

                if((screenTop - screenScrollTop - dist > listHeight) &&
                    (hasOverflow && listBottom > (viewHeight + screenScrollTop)) ||
                    (!hasOverflow && listBottom > viewHeight)){
                    //open up
                    top = offset.top - listHeight - dist;
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowUp');
                }else{
                    //open down
                    top = offset.top + (p.multiple ? el.container.outerHeight() : inputHeight);
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowDown');
                    top += dist;
                }
                return {
                    top : top + 'px', left: left + 'px'
                };
            }
        };
        if(el.result_area.is(':visible')){
            el.result_area.css(rePosition());
        }else{
            var pss = rePosition();
            el.result_area.css(pss).show(1,function(){
                var repss = rePosition();
                if(pss.top !== repss.top || pss.left !== repss.left) el.result_area.css(repss);
            });
        }
	};

	/**
	 * hide result list
	 * @param {Object} self
	 */
	SelectPage.prototype.hideResults = function(self) {
		if (self.prop.key_paging) {
			self.scrollWindow(self, true);
			self.prop.key_paging = false;
		}
		self.setCssFocusedInput(self);

		if (self.option.autoFillResult) {
			//self.selectCurrentLine(self, true);
		}

		self.elem.results.empty();
		self.elem.result_area.hide();
		self.setOpenStatus(self, false);
        //unbind window scroll listen
        $(window).off('scroll.SelectPage');

		self.abortAjax(self);
		self.setButtonAttrDefault();
	};

    /**
     * set plugin to disabled / enabled
     * @param self
     * @param disabled
     */
	SelectPage.prototype.disabled = function(self, disabled){
	    var p = self.option, el = self.elem;
	    if($.type(disabled) === 'undefined') return el.combo_input.prop('disabled');
	    if($.type(disabled) === 'boolean'){
            el.combo_input.prop('disabled', disabled);
            if(disabled)
                el.container.addClass(self.css_class.disabled);
            else
                el.container.removeClass(self.css_class.disabled);
        }
    };

	/**
	 * Go fist page
	 * @param {Object} self
	 */
	SelectPage.prototype.firstPage = function(self) {
		if (self.prop.current_page > 1) {
			self.prop.current_page = 1;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * Go previous page
	 * @param {Object} self
	 */
	SelectPage.prototype.prevPage = function(self) {
		if (self.prop.current_page > 1) {
			self.prop.current_page--;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * Go next page
	 * @param {Object} self
	 */
	SelectPage.prototype.nextPage = function(self) {
		if (self.prop.current_page < self.prop.max_page) {
			self.prop.current_page++;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * Go last page
	 * @param {Object} self
	 */
	SelectPage.prototype.lastPage = function(self) {
		if (self.prop.current_page < self.prop.max_page) {
			self.prop.current_page = self.prop.max_page;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};
	/**
	 * do something after select/unSelect action
     * @param {Object} self
	 */
	SelectPage.prototype.afterAction = function(self){
		self.inputResize(self);
		self.elem.combo_input.change();
		self.setCssFocusedInput(self);
		if(self.prop.init_set) return;
		if(self.option.multiple){
			if(self.option.selectToCloseList){
				self.hideResults(self);
				self.elem.combo_input.blur();
			}else{
				self.suggest(self);
				self.elem.combo_input.focus();
			}
		}else{
			self.hideResults(self);
			self.elem.combo_input.blur();
		}
	};

	/**
	 * Select current list item
	 * @param {Object} self
	 * @param {boolean} is_enter_key
	 */
	SelectPage.prototype.selectCurrentLine = function(self, is_enter_key) {
		self.scrollWindow(self, true);

		var p = self.option, current = self.getCurrentLine(self);
		if (current) {
			if(!p.multiple){
				self.elem.combo_input.val(current.text());
				self.elem.hidden.val(current.attr('pkey'));
			}else{
				//build tags in multiple selection mode
				self.elem.combo_input.val('');
				var item = {text:current.text(),value:current.attr('pkey')};
				if(!self.isAlreadySelected(self,item)){
					self.addNewTag(self,item);
					self.tagValuesSet(self);
				}
			}

			if (p.selectOnly) self.setButtonAttrDefault();
			
			//Select item callback
			if(p.eSelect && $.isFunction(p.eSelect))
				p.eSelect(current.data('dataObj'), self);
			
			self.prop.prev_value = self.elem.combo_input.val();
			self.prop.selected_text = self.elem.combo_input.val();

			self.putClearButton();
		}
		self.afterAction(self);
	};
    /**
     * Show clear button when item selected in single selection mode
     */
	SelectPage.prototype.putClearButton = function(){
        if(!this.option.multiple && !this.elem.combo_input.prop('disabled')) this.elem.container.append(this.elem.clear_btn);
    };
	/**
	 * Select all list item
	 * @param {Object} self
	 */
	SelectPage.prototype.selectAllLine = function(self){
		var p = self.option, jsonarr = new Array();
        self.elem.results.find('li').each(function(i,row){
            var $row = $(row);
			var item = {text:$row.text(),value:$row.attr('pkey')};
			if(!self.isAlreadySelected(self,item)){
				self.addNewTag(self,item);
				self.tagValuesSet(self);
			}
			jsonarr.push($row.data('dataObj'));
            //limited max selected items
			if($.type(p.maxSelectLimit) === 'number' &&
                p.maxSelectLimit > 0 &&
                p.maxSelectLimit === self.elem.element_box.find('li.selected_tag').size()){
			    return false;
            }
		});
		if(p.eSelect && $.isFunction(p.eSelect))
			p.eSelect(jsonarr, self);
		self.afterAction(self);
	};
	/**
	 * Cancel select all item in current page
	 * @param {Object} self
	 */
	SelectPage.prototype.unSelectAllLine = function(self){
		var p = self.option,size = self.elem.results.find('li').size();
        self.elem.results.find('li').each(function(i,row){
			var key = $(row).attr('pkey');
			var tag = self.elem.element_box.find('li.selected_tag[itemvalue="'+key+'"]');
			self.removeTag(self,tag);
		});
		self.afterAction(self);
		if(p.eTagRemove && $.isFunction(p.eTagRemove))
			p.eTagRemove(size, self);
	};
	/**
	 * Clear all selected items
	 * @param {Object} self
	 */
	SelectPage.prototype.clearAll = function(self){
		var p = self.option, size = 0;
        if(p.multiple){
            size = self.elem.element_box.find('li.selected_tag').size();
            self.elem.element_box.find('li.selected_tag').remove();
        }
        self.reset(self);
		self.afterAction(self);

        if(!p.multiple) self.elem.clear_btn.remove();
        if(p.multiple) {
            if (p.eTagRemove && $.isFunction(p.eTagRemove))
                p.eTagRemove(size, self);
        }
	};

    /**
     * reset
     */
	SelectPage.prototype.reset = function(self){
        self.elem.combo_input.val('');
        self.elem.hidden.val('');
        self.prop.prev_value = '';
        self.prop.selected_text = '';
        self.prop.current_page = 1;
    };

	/**
	 * Get current highlight item
	 * @param {Object} self
	 */
	SelectPage.prototype.getCurrentLine = function(self) {
		if (self.elem.result_area.is(':hidden')) return false;
		var obj = self.elem.results.find('li.' + self.css_class.select);
		if (obj.size()) return obj;
		else return false;
	};
	
	/**
	 * Check the result item is already selected or not
	 * @param {Object} self
	 * @param {Object} item - item info
	 */
	SelectPage.prototype.isAlreadySelected = function(self,item){
		var isExist = false;
		if(item.value){
			var keys = self.elem.hidden.val();
			if(keys){
				var karr = keys.split(',');
				if(karr && karr.length && $.inArray(item.value,karr) != -1) isExist = true;
			}
		}
		return isExist;
	};
	
	/**
	 * Add a new tag in multiple selection mode
	 * @param {Object} self
	 * @param {Object} item
	 */
	SelectPage.prototype.addNewTag = function(self,item){
		if(!self.option.multiple || !item) return;
		var tmp = self.template.tag.content,tag;
		tmp = tmp.replace(self.template.tag.textKey,item.text);
		tmp = tmp.replace(self.template.tag.valueKey,item.value);
		tag = $(tmp);
		if(self.elem.combo_input.prop('disabled')) tag.find('span.tag_close').hide();
		self.elem.combo_input.closest('li').before(tag);
	};
	/**
	 * Remove a tag in multiple selection mode
	 * @param {Object} self
	 * @param {Object} item
	 */
	SelectPage.prototype.removeTag = function(self,item){
		var key = $(item).attr('itemvalue');
		var keys = self.elem.hidden.val();
		if($.type(key)!='undefined' && keys){
			var keyarr = keys.split(','),
                index = $.inArray(key.toString(),keyarr);
			if(index != -1){
				keyarr.splice(index,1);
				self.elem.hidden.val(keyarr.toString());
			}
		}
		$(item).remove();
		self.inputResize(self);
	};
	
	/**
	 * Selected item value(keyField) put in to hidden element
	 * @param {Object} self
	 */
	SelectPage.prototype.tagValuesSet = function(self){
		if(!self.option.multiple) return;
		var tags = self.elem.element_box.find('li.selected_tag');
		if(tags && tags.size()){
			var result = new Array();
			$.each(tags,function(i,li){
				var v = $(li).attr('itemvalue');
				if($.type(v)!=='undefined') result.push(v);
			});
			if(result.length){
				self.elem.hidden.val(result.join(','));
			}
		}
	};
	
	/**
     * auto resize input element width in multiple select mode
	 * @param {Object} self
	 */
	SelectPage.prototype.inputResize = function(self){
		if(!self.option.multiple) return;
		var width = '',
            inputLi = self.elem.combo_input.closest('li');
		var setDefaultSize = function(self,inputLi){
			inputLi.removeClass('full_width');
			var minimumWidth = self.elem.combo_input.val().length + 1,
                width = (minimumWidth * 0.75) + 'em';
			self.elem.combo_input.css('width', width).removeAttr('placeholder');
		};
		if(self.elem.element_box.find('li.selected_tag').size() === 0){
			if(self.elem.combo_input.attr('placeholder_bak')){
				if(!inputLi.hasClass('full_width')) inputLi.addClass('full_width');
				self.elem.combo_input.attr('placeholder',self.elem.combo_input.attr('placeholder_bak')).removeAttr('style');
			}else setDefaultSize(self,inputLi);
		}else setDefaultSize(self,inputLi);
	};

	/**
	 * Move to next line
	 * @param {Object} self
	 */
	SelectPage.prototype.nextLine = function(self) {
		var obj = self.getCurrentLine(self), idx;
		if (!obj) idx = -1;
		else {
			idx = self.elem.results.children('li').index(obj);
			obj.removeClass(self.css_class.select);
		}
		idx++;
		if (idx < self.elem.results.children('li').length) {
			var next = self.elem.results.children('li').eq(idx);
			next.addClass(self.css_class.select);
			self.setCssFocusedResults(self);
		} else self.setCssFocusedInput(self);
		self.scrollWindow(self, false);
	};

	/**
     * Move to previous line
	 * @param {Object} self
	 */
	SelectPage.prototype.prevLine = function(self) {
		var obj = self.getCurrentLine(self), idx;
		if (!obj) idx = self.elem.results.children('li').length;
		else {
			idx = self.elem.results.children('li').index(obj);
			obj.removeClass(self.css_class.select);
		}
		idx--;
		if (idx > -1) {
			var prev = self.elem.results.children('li').eq(idx);
			prev.addClass(self.css_class.select);
			self.setCssFocusedResults(self);
		} else self.setCssFocusedInput(self);
		self.scrollWindow(self, false);
	};

    SelectPage.prototype.DIACRITICS = {"\u24B6":"A","\uFF21":"A","\u00C0":"A","\u00C1":"A","\u00C2":"A","\u1EA6":"A","\u1EA4":"A","\u1EAA":"A","\u1EA8":"A","\u00C3":"A","\u0100":"A","\u0102":"A","\u1EB0":"A","\u1EAE":"A","\u1EB4":"A","\u1EB2":"A","\u0226":"A","\u01E0":"A","\u00C4":"A","\u01DE":"A","\u1EA2":"A","\u00C5":"A","\u01FA":"A","\u01CD":"A","\u0200":"A","\u0202":"A","\u1EA0":"A","\u1EAC":"A","\u1EB6":"A","\u1E00":"A","\u0104":"A","\u023A":"A","\u2C6F":"A","\uA732":"AA","\u00C6":"AE","\u01FC":"AE","\u01E2":"AE","\uA734":"AO","\uA736":"AU","\uA738":"AV","\uA73A":"AV","\uA73C":"AY","\u24B7":"B","\uFF22":"B","\u1E02":"B","\u1E04":"B","\u1E06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24B8":"C","\uFF23":"C","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u00C7":"C","\u1E08":"C","\u0187":"C","\u023B":"C","\uA73E":"C","\u24B9":"D","\uFF24":"D","\u1E0A":"D","\u010E":"D","\u1E0C":"D","\u1E10":"D","\u1E12":"D","\u1E0E":"D","\u0110":"D","\u018B":"D","\u018A":"D","\u0189":"D","\uA779":"D","\u01F1":"DZ","\u01C4":"DZ","\u01F2":"Dz","\u01C5":"Dz","\u24BA":"E","\uFF25":"E","\u00C8":"E","\u00C9":"E","\u00CA":"E","\u1EC0":"E","\u1EBE":"E","\u1EC4":"E","\u1EC2":"E","\u1EBC":"E","\u0112":"E","\u1E14":"E","\u1E16":"E","\u0114":"E","\u0116":"E","\u00CB":"E","\u1EBA":"E","\u011A":"E","\u0204":"E","\u0206":"E","\u1EB8":"E","\u1EC6":"E","\u0228":"E","\u1E1C":"E","\u0118":"E","\u1E18":"E","\u1E1A":"E","\u0190":"E","\u018E":"E","\u24BB":"F","\uFF26":"F","\u1E1E":"F","\u0191":"F","\uA77B":"F","\u24BC":"G","\uFF27":"G","\u01F4":"G","\u011C":"G","\u1E20":"G","\u011E":"G","\u0120":"G","\u01E6":"G","\u0122":"G","\u01E4":"G","\u0193":"G","\uA7A0":"G","\uA77D":"G","\uA77E":"G","\u24BD":"H","\uFF28":"H","\u0124":"H","\u1E22":"H","\u1E26":"H","\u021E":"H","\u1E24":"H","\u1E28":"H","\u1E2A":"H","\u0126":"H","\u2C67":"H","\u2C75":"H","\uA78D":"H","\u24BE":"I","\uFF29":"I","\u00CC":"I","\u00CD":"I","\u00CE":"I","\u0128":"I","\u012A":"I","\u012C":"I","\u0130":"I","\u00CF":"I","\u1E2E":"I","\u1EC8":"I","\u01CF":"I","\u0208":"I","\u020A":"I","\u1ECA":"I","\u012E":"I","\u1E2C":"I","\u0197":"I","\u24BF":"J","\uFF2A":"J","\u0134":"J","\u0248":"J","\u24C0":"K","\uFF2B":"K","\u1E30":"K","\u01E8":"K","\u1E32":"K","\u0136":"K","\u1E34":"K","\u0198":"K","\u2C69":"K","\uA740":"K","\uA742":"K","\uA744":"K","\uA7A2":"K","\u24C1":"L","\uFF2C":"L","\u013F":"L","\u0139":"L","\u013D":"L","\u1E36":"L","\u1E38":"L","\u013B":"L","\u1E3C":"L","\u1E3A":"L","\u0141":"L","\u023D":"L","\u2C62":"L","\u2C60":"L","\uA748":"L","\uA746":"L","\uA780":"L","\u01C7":"LJ","\u01C8":"Lj","\u24C2":"M","\uFF2D":"M","\u1E3E":"M","\u1E40":"M","\u1E42":"M","\u2C6E":"M","\u019C":"M","\u24C3":"N","\uFF2E":"N","\u01F8":"N","\u0143":"N","\u00D1":"N","\u1E44":"N","\u0147":"N","\u1E46":"N","\u0145":"N","\u1E4A":"N","\u1E48":"N","\u0220":"N","\u019D":"N","\uA790":"N","\uA7A4":"N","\u01CA":"NJ","\u01CB":"Nj","\u24C4":"O","\uFF2F":"O","\u00D2":"O","\u00D3":"O","\u00D4":"O","\u1ED2":"O","\u1ED0":"O","\u1ED6":"O","\u1ED4":"O","\u00D5":"O","\u1E4C":"O","\u022C":"O","\u1E4E":"O","\u014C":"O","\u1E50":"O","\u1E52":"O","\u014E":"O","\u022E":"O","\u0230":"O","\u00D6":"O","\u022A":"O","\u1ECE":"O","\u0150":"O","\u01D1":"O","\u020C":"O","\u020E":"O","\u01A0":"O","\u1EDC":"O","\u1EDA":"O","\u1EE0":"O","\u1EDE":"O","\u1EE2":"O","\u1ECC":"O","\u1ED8":"O","\u01EA":"O","\u01EC":"O","\u00D8":"O","\u01FE":"O","\u0186":"O","\u019F":"O","\uA74A":"O","\uA74C":"O","\u01A2":"OI","\uA74E":"OO","\u0222":"OU","\u24C5":"P","\uFF30":"P","\u1E54":"P","\u1E56":"P","\u01A4":"P","\u2C63":"P","\uA750":"P","\uA752":"P","\uA754":"P","\u24C6":"Q","\uFF31":"Q","\uA756":"Q","\uA758":"Q","\u024A":"Q","\u24C7":"R","\uFF32":"R","\u0154":"R","\u1E58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1E5A":"R","\u1E5C":"R","\u0156":"R","\u1E5E":"R","\u024C":"R","\u2C64":"R","\uA75A":"R","\uA7A6":"R","\uA782":"R","\u24C8":"S","\uFF33":"S","\u1E9E":"S","\u015A":"S","\u1E64":"S","\u015C":"S","\u1E60":"S","\u0160":"S","\u1E66":"S","\u1E62":"S","\u1E68":"S","\u0218":"S","\u015E":"S","\u2C7E":"S","\uA7A8":"S","\uA784":"S","\u24C9":"T","\uFF34":"T","\u1E6A":"T","\u0164":"T","\u1E6C":"T","\u021A":"T","\u0162":"T","\u1E70":"T","\u1E6E":"T","\u0166":"T","\u01AC":"T","\u01AE":"T","\u023E":"T","\uA786":"T","\uA728":"TZ","\u24CA":"U","\uFF35":"U","\u00D9":"U","\u00DA":"U","\u00DB":"U","\u0168":"U","\u1E78":"U","\u016A":"U","\u1E7A":"U","\u016C":"U","\u00DC":"U","\u01DB":"U","\u01D7":"U","\u01D5":"U","\u01D9":"U","\u1EE6":"U","\u016E":"U","\u0170":"U","\u01D3":"U","\u0214":"U","\u0216":"U","\u01AF":"U","\u1EEA":"U","\u1EE8":"U","\u1EEE":"U","\u1EEC":"U","\u1EF0":"U","\u1EE4":"U","\u1E72":"U","\u0172":"U","\u1E76":"U","\u1E74":"U","\u0244":"U","\u24CB":"V","\uFF36":"V","\u1E7C":"V","\u1E7E":"V","\u01B2":"V","\uA75E":"V","\u0245":"V","\uA760":"VY","\u24CC":"W","\uFF37":"W","\u1E80":"W","\u1E82":"W","\u0174":"W","\u1E86":"W","\u1E84":"W","\u1E88":"W","\u2C72":"W","\u24CD":"X","\uFF38":"X","\u1E8A":"X","\u1E8C":"X","\u24CE":"Y","\uFF39":"Y","\u1EF2":"Y","\u00DD":"Y","\u0176":"Y","\u1EF8":"Y","\u0232":"Y","\u1E8E":"Y","\u0178":"Y","\u1EF6":"Y","\u1EF4":"Y","\u01B3":"Y","\u024E":"Y","\u1EFE":"Y","\u24CF":"Z","\uFF3A":"Z","\u0179":"Z","\u1E90":"Z","\u017B":"Z","\u017D":"Z","\u1E92":"Z","\u1E94":"Z","\u01B5":"Z","\u0224":"Z","\u2C7F":"Z","\u2C6B":"Z","\uA762":"Z","\u24D0":"a","\uFF41":"a","\u1E9A":"a","\u00E0":"a","\u00E1":"a","\u00E2":"a","\u1EA7":"a","\u1EA5":"a","\u1EAB":"a","\u1EA9":"a","\u00E3":"a","\u0101":"a","\u0103":"a","\u1EB1":"a","\u1EAF":"a","\u1EB5":"a","\u1EB3":"a","\u0227":"a","\u01E1":"a","\u00E4":"a","\u01DF":"a","\u1EA3":"a","\u00E5":"a","\u01FB":"a","\u01CE":"a","\u0201":"a","\u0203":"a","\u1EA1":"a","\u1EAD":"a","\u1EB7":"a","\u1E01":"a","\u0105":"a","\u2C65":"a","\u0250":"a","\uA733":"aa","\u00E6":"ae","\u01FD":"ae","\u01E3":"ae","\uA735":"ao","\uA737":"au","\uA739":"av","\uA73B":"av","\uA73D":"ay","\u24D1":"b","\uFF42":"b","\u1E03":"b","\u1E05":"b","\u1E07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24D2":"c","\uFF43":"c","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u00E7":"c","\u1E09":"c","\u0188":"c","\u023C":"c","\uA73F":"c","\u2184":"c","\u24D3":"d","\uFF44":"d","\u1E0B":"d","\u010F":"d","\u1E0D":"d","\u1E11":"d","\u1E13":"d","\u1E0F":"d","\u0111":"d","\u018C":"d","\u0256":"d","\u0257":"d","\uA77A":"d","\u01F3":"dz","\u01C6":"dz","\u24D4":"e","\uFF45":"e","\u00E8":"e","\u00E9":"e","\u00EA":"e","\u1EC1":"e","\u1EBF":"e","\u1EC5":"e","\u1EC3":"e","\u1EBD":"e","\u0113":"e","\u1E15":"e","\u1E17":"e","\u0115":"e","\u0117":"e","\u00EB":"e","\u1EBB":"e","\u011B":"e","\u0205":"e","\u0207":"e","\u1EB9":"e","\u1EC7":"e","\u0229":"e","\u1E1D":"e","\u0119":"e","\u1E19":"e","\u1E1B":"e","\u0247":"e","\u025B":"e","\u01DD":"e","\u24D5":"f","\uFF46":"f","\u1E1F":"f","\u0192":"f","\uA77C":"f","\u24D6":"g","\uFF47":"g","\u01F5":"g","\u011D":"g","\u1E21":"g","\u011F":"g","\u0121":"g","\u01E7":"g","\u0123":"g","\u01E5":"g","\u0260":"g","\uA7A1":"g","\u1D79":"g","\uA77F":"g","\u24D7":"h","\uFF48":"h","\u0125":"h","\u1E23":"h","\u1E27":"h","\u021F":"h","\u1E25":"h","\u1E29":"h","\u1E2B":"h","\u1E96":"h","\u0127":"h","\u2C68":"h","\u2C76":"h","\u0265":"h","\u0195":"hv","\u24D8":"i","\uFF49":"i","\u00EC":"i","\u00ED":"i","\u00EE":"i","\u0129":"i","\u012B":"i","\u012D":"i","\u00EF":"i","\u1E2F":"i","\u1EC9":"i","\u01D0":"i","\u0209":"i","\u020B":"i","\u1ECB":"i","\u012F":"i","\u1E2D":"i","\u0268":"i","\u0131":"i","\u24D9":"j","\uFF4A":"j","\u0135":"j","\u01F0":"j","\u0249":"j","\u24DA":"k","\uFF4B":"k","\u1E31":"k","\u01E9":"k","\u1E33":"k","\u0137":"k","\u1E35":"k","\u0199":"k","\u2C6A":"k","\uA741":"k","\uA743":"k","\uA745":"k","\uA7A3":"k","\u24DB":"l","\uFF4C":"l","\u0140":"l","\u013A":"l","\u013E":"l","\u1E37":"l","\u1E39":"l","\u013C":"l","\u1E3D":"l","\u1E3B":"l","\u017F":"l","\u0142":"l","\u019A":"l","\u026B":"l","\u2C61":"l","\uA749":"l","\uA781":"l","\uA747":"l","\u01C9":"lj","\u24DC":"m","\uFF4D":"m","\u1E3F":"m","\u1E41":"m","\u1E43":"m","\u0271":"m","\u026F":"m","\u24DD":"n","\uFF4E":"n","\u01F9":"n","\u0144":"n","\u00F1":"n","\u1E45":"n","\u0148":"n","\u1E47":"n","\u0146":"n","\u1E4B":"n","\u1E49":"n","\u019E":"n","\u0272":"n","\u0149":"n","\uA791":"n","\uA7A5":"n","\u01CC":"nj","\u24DE":"o","\uFF4F":"o","\u00F2":"o","\u00F3":"o","\u00F4":"o","\u1ED3":"o","\u1ED1":"o","\u1ED7":"o","\u1ED5":"o","\u00F5":"o","\u1E4D":"o","\u022D":"o","\u1E4F":"o","\u014D":"o","\u1E51":"o","\u1E53":"o","\u014F":"o","\u022F":"o","\u0231":"o","\u00F6":"o","\u022B":"o","\u1ECF":"o","\u0151":"o","\u01D2":"o","\u020D":"o","\u020F":"o","\u01A1":"o","\u1EDD":"o","\u1EDB":"o","\u1EE1":"o","\u1EDF":"o","\u1EE3":"o","\u1ECD":"o","\u1ED9":"o","\u01EB":"o","\u01ED":"o","\u00F8":"o","\u01FF":"o","\u0254":"o","\uA74B":"o","\uA74D":"o","\u0275":"o","\u01A3":"oi","\u0223":"ou","\uA74F":"oo","\u24DF":"p","\uFF50":"p","\u1E55":"p","\u1E57":"p","\u01A5":"p","\u1D7D":"p","\uA751":"p","\uA753":"p","\uA755":"p","\u24E0":"q","\uFF51":"q","\u024B":"q","\uA757":"q","\uA759":"q","\u24E1":"r","\uFF52":"r","\u0155":"r","\u1E59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1E5B":"r","\u1E5D":"r","\u0157":"r","\u1E5F":"r","\u024D":"r","\u027D":"r","\uA75B":"r","\uA7A7":"r","\uA783":"r","\u24E2":"s","\uFF53":"s","\u00DF":"s","\u015B":"s","\u1E65":"s","\u015D":"s","\u1E61":"s","\u0161":"s","\u1E67":"s","\u1E63":"s","\u1E69":"s","\u0219":"s","\u015F":"s","\u023F":"s","\uA7A9":"s","\uA785":"s","\u1E9B":"s","\u24E3":"t","\uFF54":"t","\u1E6B":"t","\u1E97":"t","\u0165":"t","\u1E6D":"t","\u021B":"t","\u0163":"t","\u1E71":"t","\u1E6F":"t","\u0167":"t","\u01AD":"t","\u0288":"t","\u2C66":"t","\uA787":"t","\uA729":"tz","\u24E4":"u","\uFF55":"u","\u00F9":"u","\u00FA":"u","\u00FB":"u","\u0169":"u","\u1E79":"u","\u016B":"u","\u1E7B":"u","\u016D":"u","\u00FC":"u","\u01DC":"u","\u01D8":"u","\u01D6":"u","\u01DA":"u","\u1EE7":"u","\u016F":"u","\u0171":"u","\u01D4":"u","\u0215":"u","\u0217":"u","\u01B0":"u","\u1EEB":"u","\u1EE9":"u","\u1EEF":"u","\u1EED":"u","\u1EF1":"u","\u1EE5":"u","\u1E73":"u","\u0173":"u","\u1E77":"u","\u1E75":"u","\u0289":"u","\u24E5":"v","\uFF56":"v","\u1E7D":"v","\u1E7F":"v","\u028B":"v","\uA75F":"v","\u028C":"v","\uA761":"vy","\u24E6":"w","\uFF57":"w","\u1E81":"w","\u1E83":"w","\u0175":"w","\u1E87":"w","\u1E85":"w","\u1E98":"w","\u1E89":"w","\u2C73":"w","\u24E7":"x","\uFF58":"x","\u1E8B":"x","\u1E8D":"x","\u24E8":"y","\uFF59":"y","\u1EF3":"y","\u00FD":"y","\u0177":"y","\u1EF9":"y","\u0233":"y","\u1E8F":"y","\u00FF":"y","\u1EF7":"y","\u1E99":"y","\u1EF5":"y","\u01B4":"y","\u024F":"y","\u1EFF":"y","\u24E9":"z","\uFF5A":"z","\u017A":"z","\u1E91":"z","\u017C":"z","\u017E":"z","\u1E93":"z","\u1E95":"z","\u01B6":"z","\u0225":"z","\u0240":"z","\u2C6C":"z","\uA763":"z"};

    SelectPage.prototype.stripDiacritics = function (str) {
    	if(!str){
            return "";
		}

    	var _this = this;
        function match(a) {
            return _this.DIACRITICS[a] || a;
        }

        return str.replace(/[^\u0000-\u007E]/g, match);
    }

    SelectPage.prototype.escapeMarkup = function (markup) {
        var replace_map = {
            '\\': '&#92;',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#47;'
        };

        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
            return replace_map[match];
        });
    }

    SelectPage.prototype.markMatch = function (text, term) {
        var markup = [];
        var match = this.stripDiacritics(text).indexOf(this.stripDiacritics(term));
        var tl = term.length;

        if (match<0) {
            markup.push(this.escapeMarkup(text));
            return markup.join("");
        }

        if(tl == 0){
            markup.push(text);
		}else {
            markup.push(this.escapeMarkup(text.substring(0, match)));
            markup.push("<span class='selectpage-match'>");
            markup.push(this.escapeMarkup(text.substring(match, match + tl)));
            markup.push("</span>");
            markup.push(this.escapeMarkup(text.substring(match + tl, text.length)));
        }

        return markup.join("");
    }

    function formatItem(row){
		var text = row.name;
        var reg =/(.*)<span class='selectpage-match'>(.*)<\/span>(.*)/;
		if(text.match(reg)){
            text = reg.exec(text)[1] + reg.exec(text)[2] + reg.exec(text)[3];;
		}
		return text;
	}

	/**
	 * SelectPage plugin definition
	 * @global
	 * @param option {Object} init plugin option
	 */
	function Plugin(option) {
		return this.each(function(){
			var $this = $(this),
				data = $this.data(SelectPage.dataKey),
				params = $.extend({}, defaults, $this.data(), data && data.option ,typeof option === 'object' && option);
			if(!data) $this.data(SelectPage.dataKey,(data =  new SelectPage(this,params)));
		});
	}

	/**
	 * Get plugin object
	 * @param {object} obj 
	 * @returns 
	 */
	function getPlugin(obj){
		return $(obj).closest('div.sp_container').find('input.sp_hidden');
	}

	/**
	 * Clear all selected item
	 */
	function ClearSelected(){
		return this.each(function(){
			var $this = getPlugin(this),
				data = $this.data(SelectPage.dataKey);
			if(data){
			    data.prop.init_set = true;
			    data.clearAll(data);
                data.prop.init_set = false;
            }
		});
	}

	/**
	 * Refresh result list
     * use case:
     * 1.use $(obj).val('xxx') to modify selectpage selected item key
     * 2.refresh selected item show content/tag text
	 */
	function SelectedRefresh(){
		return this.each(function(){
			var $this = getPlugin(this),
				data = $this.data(SelectPage.dataKey);
			if(data && data.elem.hidden.val())
				data.setInitRecord(true);
		});
	}
	
	/**
	 * Modify plugin datasource, only work on json datasource mode
	 * @param {array} data - new datasource
	 * @example
	 * [{name:'aa',sex:1},{name:'bb',sex:0},{...}]
	 */
	function ModifyDataSource(data){
		return this.each(function(){
			if(data && $.isArray(data)){
				var $this = getPlugin(this),
					plugin = $this.data(SelectPage.dataKey);
				if(plugin){
					plugin.clearAll(plugin);
					plugin.option.data = data;
				}
			}
		});
	}

    /**
     * Get plugin disabled status or Modify plugin disabled status
     * @param disabled {boolean} set disabled status
     */
	function PluginDisabled(disabled){
	    var status = false;
        this.each(function(){
            var $this = getPlugin(this),
                plugin = $this.data(SelectPage.dataKey);
            if(plugin) {
                if($.type(disabled) !== 'undefined')
                    plugin.disabled(plugin, disabled);
                else
                    status = plugin.disabled(plugin);
            }
        });
        return status;
    }

	/**
	 * Get selected item text
	 * @returns {string}
	 */
	function GetInputText(){
		var str = '';
		this.each(function(){
			var $this = getPlugin(this),data = $this.data(SelectPage.dataKey);
			if(data){
			    if(data.option.multiple){
			        var tags = [];
                    data.elem.element_box.find('li.selected_tag').each(function(i, tag){
                        tags.push($(tag).text());
                    });
                    str += tags.toString();
                }else{
                    str += data.elem.combo_input.val();
                }
            }
		});
		return str;
	}	

	var old = $.fn.selectPage;

	$.fn.selectPage              = Plugin;
	$.fn.selectPage.Constructor = SelectPage;
	$.fn.selectPageClear         = ClearSelected;
	$.fn.selectPageRefresh       = SelectedRefresh;
	$.fn.selectPageData          = ModifyDataSource;
	$.fn.selectPageDisabled      = PluginDisabled;
	$.fn.selectPageText          = GetInputText;
	
	// SelectPage no conflict
	// =================
	$.fn.selectPage.noConflict = function () {
		$.fn.selectPage = old;
		return this;
	};
})(window.jQuery);
