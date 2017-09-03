import React from 'react';

export default class SingleFigure extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        //e.preventDefault();
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
    }

    handleMouseOver(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.clear();
    }

    render() {
        var self = this;
        var styleObj = {};
        // 如果props属性中定义了这张图片的位置 则使用
        if (self.props.arrange.pos) {
            styleObj = self.props.arrange.pos;
        }
        //如果图片的旋转角度不为0 ，添加旋转角度
        if (self.props.arrange.rotate) {
            // 添加厂商前缀
            (['MozTransform', 'WebkitTransform', 'MsTransform', 'transform']).forEach((value) => {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)'
            })
        }
        // 通过类名 来控制 图片的正反
        var imgFigureClassName = 'img-figure';
        if (self.props.arrange.inverse) {
            imgFigureClassName += ' is-inverse'
        }
        if (self.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}
                    onMouseOver={this.handleMouseOver}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <div dangerouslySetInnerHTML={{__html: this.props.data.desc}}/>
                    </div>
                </figcaption>
            </figure>
        )
    }
}
