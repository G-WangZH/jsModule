*
* ������������������� innerHTML ����
* �������� HTML �����а��� script �� style
* ������
*   el: DOM ���еĽڵ㣬�������� innerHTML
*   htmlCode: ����� HTML ����
* �����Ե��������ie5+, firefox1.5+, opera8.5+
*/
var set_innerHTML = function (el, htmlCode)
{var ua = navigator.userAgent.toLowerCase();
 if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0) 
 {htmlCode = '<div style="display:none">for IE</div>' + htmlCode;
  htmlCode = htmlCode.replace(/<script([^>]*)>/gi,'<script$1 defer="true">');
  el.innerHTML = htmlCode;
  el.removeChild(el.firstChild);
 }
 else 
 {var el_next = el.nextSibling;
  var el_parent = el.parentNode;
  el_parent.removeChild(el);
  el.innerHTML = htmlCode;
  if (el_next)
   el_parent.insertBefore(el, el_next)
  else
   el_parent.appendChild(el);
 }
}
����Ĵ��뻹��һ�����⣺�������� HTML �����а��� document.write ��䣬��ô�ͻ��ƻ�����ҳ�档�����������������ͨ�����¶��� document.write �����⡣�������£�
/*
 �������ض��� document.write ����.
 ������ʹ�� set_innerHTML ʱ������� HTML �����а��� document.write ��䣬����ԭҳ���ܵ��ƻ���
*/
document.write = function(){
 var body = document.getElementsByTagName('body')[0];
 for (var i = 0; i < arguments.length; i++) {
  argument = arguments[i];
  if (typeof argument == 'string') {
   var el = body.appendChild(document.createElement('div'));
   set_innerHTML(el, argument)
  }
 }
}