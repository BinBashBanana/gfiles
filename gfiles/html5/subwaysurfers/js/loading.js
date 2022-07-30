/* eslint-disable prefer-template */
/* eslint-disable func-names */
/* eslint-disable no-var */

function LoadingBar()
{
    var showing = false;
    var width = 300;
    var height = 30;
    var border = 4;
    var total = 0;

    var container = document.createElement('div');

    container.style.position = 'fixed';
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    container.style.zIndex = 999;

    var base = document.createElement('div');

    base.style.position = 'absolute';
    base.style.width = width + 'px';
    base.style.height = height + 'px';
    base.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    container.appendChild(base);

    var bar = document.createElement('div');

    bar.style.position = 'absolute';
    bar.style.left = border + 'px';
    bar.style.top = border + 'px';
    bar.style.width = (width - (border * 2)) + 'px';
    bar.style.height = (height - (border * 2)) + 'px';
    bar.style.backgroundColor = '#f65000';
    container.appendChild(bar);

    var label = document.createElement('div');

    label.style.position = 'fixed';
    label.style.width = width + 'px';
    label.style.height = height + 'px';
    label.style.lineHeight = height + 'px';
    label.style.textAlign = 'center';
    label.style.color = '#FFFFFF';
    label.style.fontWeight = 'bold';
    label.style.fontSize = '12px';
    label.style.fontFamily = '"Verdana", sans-serif';
    container.appendChild(label);

    function resize()
    {
        container.style.left = ((window.innerWidth * 0.5) - (width * 0.5)) + 'px';
        container.style.top = ((window.innerHeight * 0.5) + 120) + 'px';
    }

    function show()
    {
        if (showing) return;
        showing = true;
        document.body.appendChild(container);
        window.addEventListener('resize', resize);
        setProgress(0);
        resize();
    }

    function hide()
    {
        if (!showing) return;
        showing = false;
        container.remove();
        window.removeEventListener('resize', resize);
    }

    function setTotal(mbs)
    {
        total = mbs;
    }

    function setProgress(ratio)
    {
        if (ratio < 0) ratio = 0;
        if (ratio > 1) ratio = 1;

        var barMaxWidth = width - (border * 2);
        var percent = Math.round(ratio * 100) + '%';

        bar.style.width = (barMaxWidth * ratio) + 'px';

        if (total)
        {
            var loaded = (total * ratio).toFixed(1);
            var mbs = loaded + '/' + total + ' MB';

            label.innerText = percent + ' - ' + mbs;
        }
        else
        {
            label.innerText = percent;
        }
    }

    show();
    this.show = show;
    this.hide = hide;
    this.setTotal = setTotal;
    this.setProgress = setProgress;
}

window.loadingBar = new LoadingBar();
