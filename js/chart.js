// Chart.js - 图表绘制工具

/**
 * 初始化驾驶舱页面的图表
 */
function initDashboardCharts() {
    // 贷款趋势图
    const loanTrendCtx = document.getElementById('loanTrendChart').getContext('2d');
    const loanTrendData = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '贷款发放金额',
                data: [150, 220, 180, 270, 310, 290, 380, 320, 290, 350, 410, 320],
                borderColor: '#653EB3',
                backgroundColor: 'rgba(101, 62, 179, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: '贷款回收金额',
                data: [100, 170, 150, 210, 250, 230, 300, 270, 240, 290, 330, 280],
                borderColor: '#F35252',
                backgroundColor: 'rgba(243, 82, 82, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }
        ]
    };
    
    new Chart(loanTrendCtx, {
        type: 'line',
        data: loanTrendData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '金额（万元）'
                    }
                }
            }
        }
    });

    // 客户分布图
    const customerDistCtx = document.getElementById('customerDistributionChart').getContext('2d');
    const customerDistData = {
        labels: ['优质客户', '标准客户', '风险客户', '黑名单客户', '新客户'],
        datasets: [{
            data: [35, 45, 12, 3, 5],
            backgroundColor: [
                '#3BB950',
                '#56A0B0',
                '#E6A733',
                '#F35252',
                '#F28335'
            ],
            hoverOffset: 4
        }]
    };
    
    new Chart(customerDistCtx, {
        type: 'doughnut',
        data: customerDistData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

/**
 * 绘制客户评级的雷达图
 * @param {string} elementId - 容器元素ID
 * @param {Object} data - 评级数据
 */
function drawCustomerRatingRadarChart(elementId, data) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const radarData = {
        labels: ['资产水平', '信用历史', '履约能力', '行为偏好', '客户关系'],
        datasets: [{
            label: '客户评级',
            data: [data.assetLevel, data.creditHistory, data.performanceCapability, data.behaviorPreference, data.customerRelationship],
            fill: true,
            backgroundColor: 'rgba(101, 62, 179, 0.2)',
            borderColor: 'rgb(101, 62, 179)',
            pointBackgroundColor: 'rgb(101, 62, 179)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(101, 62, 179)'
        }]
    };
    
    new Chart(ctx, {
        type: 'radar',
        data: radarData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * 绘制KPI趋势图
 * @param {string} elementId - 容器元素ID
 * @param {Object} data - KPI数据
 */
function drawKpiTrendChart(elementId, data) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const chartData = {
        labels: data.months,
        datasets: [{
            label: 'KPI评分',
            data: data.values,
            borderColor: '#653EB3',
            backgroundColor: 'rgba(101, 62, 179, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'KPI评分'
                    }
                }
            }
        }
    });
}

/**
 * 绘制网点揽派件趋势图
 * @param {string} elementId - 容器元素ID
 * @param {Object} data - 揽派件数据
 */
function drawDeliveryTrendChart(elementId, data) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const chartData = {
        labels: data.months,
        datasets: [
            {
                label: '揽件',
                data: data.pickupValues,
                borderColor: '#653EB3',
                backgroundColor: 'rgba(101, 62, 179, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: '派件',
                data: data.deliveryValues,
                borderColor: '#3BB950',
                backgroundColor: 'rgba(59, 185, 80, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '数量'
                    }
                }
            }
        }
    });
}

/**
 * 绘制成本分析图
 * @param {string} elementId - 容器元素ID
 * @param {Object} data - 成本数据
 */
function drawCostAnalysisChart(elementId, data) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const chartData = {
        labels: data.categories,
        datasets: [{
            label: '成本分析',
            data: data.values,
            backgroundColor: [
                '#653EB3',
                '#3BB950',
                '#E6A733',
                '#F35252'
            ],
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '成本（元）'
                    }
                }
            }
        }
    });
}

// 金刚账户预警图表
function drawWarningChart(elementId, data) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const chartData = {
        labels: data.dates,
        datasets: [{
            label: '预警金额',
            data: data.values,
            borderColor: '#F35252',
            backgroundColor: 'rgba(243, 82, 82, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '金额（万元）'
                    }
                }
            }
        }
    });
}

/**
 * 获取Chart.js共享的样式配置
 * @param {string} type 图表类型：'line', 'bar', 'pie', 'doughnut'等
 * @returns {object} 样式配置对象
 */
function getChartSharedOptions(type) {
    // 基础配置
    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: type === 'pie' || type === 'doughnut' ? 'right' : 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        family: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#333',
                bodyColor: '#666',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                titleFont: {
                    family: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    family: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                    size: 13
                },
                padding: 10,
                boxPadding: 5,
                displayColors: true,
                usePointStyle: true
            }
        }
    };
    
    // 针对不同类型图表的特定配置
    if (type === 'line') {
        return {
            ...baseOptions,
            plugins: {
                ...baseOptions.plugins,
                tooltip: {
                    ...baseOptions.plugins.tooltip,
                    mode: 'index',
                    intersect: false
                }
            },
            elements: {
                line: {
                    tension: 0.4
                },
                point: {
                    radius: 3,
                    hoverRadius: 5
                }
            }
        };
    } else if (type === 'bar') {
        return {
            ...baseOptions,
            plugins: {
                ...baseOptions.plugins,
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        };
    } else if (type === 'pie' || type === 'doughnut') {
        return {
            ...baseOptions,
            cutout: type === 'doughnut' ? '65%' : 0,
            plugins: {
                ...baseOptions.plugins
            }
        };
    }
    
    return baseOptions;
}

/**
 * 获取Chart.js的调色板颜色
 * @param {number} index 颜色索引
 * @returns {string} 颜色值
 */
function getChartColor(index) {
    const colors = [
        'rgba(101, 62, 179, 0.8)',  // 主色 - 紫色
        'rgba(242, 131, 53, 0.8)',  // 橙色
        'rgba(86, 160, 176, 0.8)',  // 蓝绿色
        'rgba(59, 185, 80, 0.8)',   // 绿色
        'rgba(243, 82, 82, 0.8)',   // 红色
        'rgba(230, 167, 51, 0.8)',  // 黄色
        'rgba(109, 39, 99, 0.8)',   // 深紫色
        'rgba(131, 131, 131, 0.8)'  // 灰色
    ];
    
    return colors[index % colors.length];
}

/**
 * 获取Chart.js的边框颜色
 * @param {number} index 颜色索引
 * @returns {string} 边框颜色值
 */
function getChartBorderColor(index) {
    const colors = [
        'rgba(101, 62, 179, 1)',    // 主色 - 紫色
        'rgba(242, 131, 53, 1)',    // 橙色
        'rgba(86, 160, 176, 1)',    // 蓝绿色
        'rgba(59, 185, 80, 1)',     // 绿色
        'rgba(243, 82, 82, 1)',     // 红色
        'rgba(230, 167, 51, 1)',    // 黄色
        'rgba(109, 39, 99, 1)',     // 深紫色
        'rgba(131, 131, 131, 1)'    // 灰色
    ];
    
    return colors[index % colors.length];
}

/**
 * 绘制车辆统计图表
 * @param {string} elementId - 容器元素ID
 * @param {Object} data - 统计数据
 */
function drawVehicleStatsChart(elementId, data) {
    const ctx = document.getElementById(elementId).getContext('2d');
    
    // 检查是否有旧图表
    if (window.vehicleStatsChart) {
        window.vehicleStatsChart.destroy();
    }
    
    // 创建数据
    const chartData = {
        labels: data.labels,
        datasets: [{
            label: '车辆资产概况',
            data: data.values,
            backgroundColor: data.colors,
            borderWidth: 0
        }]
    };
    
    // 创建图表配置
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        
                        if (label) {
                            label += ': ';
                        }
                        
                        const value = context.parsed;
                        if (context.dataIndex === 0) {
                            return `${label}${value} 辆`;
                        } else if (context.dataIndex === 1) {
                            return `${label}${value} 万元/月`;
                        } else {
                            return `${label}${value} 万元`;
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    callback: function(value) {
                        return value;
                    }
                }
            }
        }
    };
    
    // 创建图表
    window.vehicleStatsChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: options
    });
}

/**
 * 初始化营销管理页面的图表
 */
function initMarketingCharts() {
    // 营销渠道效果分析图表
    const marketingChannelCtx = document.getElementById('marketingChannelChart').getContext('2d');
    const marketingChannelData = {
        labels: ['微信公众号', 'App推送', '短信', '电话营销', '线下活动', '社交媒体'],
        datasets: [
            {
                label: '客户触达人数',
                data: [1500, 2200, 1800, 950, 600, 1200],
                backgroundColor: '#653EB3',
                borderColor: '#653EB3',
                borderWidth: 1
            },
            {
                label: '转化人数',
                data: [320, 510, 290, 180, 150, 220],
                backgroundColor: '#F35252',
                borderColor: '#F35252',
                borderWidth: 1
            }
        ]
    };
    
    new Chart(marketingChannelCtx, {
        type: 'bar',
        data: marketingChannelData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '人数'
                    }
                }
            }
        }
    });

    // 营销漏斗图
    const marketingFunnelCtx = document.getElementById('marketingFunnelChart').getContext('2d');
    const marketingFunnelData = {
        labels: ['触达客户', '浏览详情', '提交申请', '完成审批', '最终转化'],
        datasets: [{
            data: [5000, 3200, 1600, 900, 500],
            backgroundColor: [
                'rgba(101, 62, 179, 0.8)',
                'rgba(101, 62, 179, 0.6)',
                'rgba(101, 62, 179, 0.4)',
                'rgba(101, 62, 179, 0.3)',
                'rgba(101, 62, 179, 0.2)'
            ],
            borderColor: '#653EB3',
            borderWidth: 1
        }]
    };
    
    new Chart(marketingFunnelCtx, {
        type: 'bar',
        data: marketingFunnelData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '人数'
                    }
                }
            }
        }
    });
}
