// main.js - 主要JavaScript文件

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面导航
    initNavigation();
    
    // 初始化模态框
    initModals();
    
    // 初始化菜单切换功能
    initMenuToggle();
    
    // 加载客户管理页面内容
    loadCustomerPage();
    
    // 加载任务管理页面内容
    loadTaskPage();
    
    // 加载日程管理页面内容
    loadSchedulePage();
    
    // 加载数据报表页面内容
    loadReportPage();
    
    // 加载消息中心页面内容
    loadMessagePage();
    
    // 加载营销管理页面内容
    loadMarketingPage();
    
    // 初始化驾驶舱的图表
    initDashboardCharts();
    
    // 初始化消息通知
    initNotification();
});

/**
 * 初始化导航功能
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-menu li');
    const pageTitle = document.querySelector('.page-title');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除当前激活状态
            document.querySelector('.nav-menu li.active').classList.remove('active');
            
            // 设置新的激活项
            this.classList.add('active');
            
            // 获取要显示的页面ID
            const pageId = this.getAttribute('data-page');
            
            // 更新页面标题
            pageTitle.textContent = this.textContent.trim();
            
            // 隐藏当前页面
            document.querySelector('.page-content.active').classList.remove('active');
            
            // 显示新页面
            document.getElementById(pageId + '-page').classList.add('active');
        });
    });
}

/**
 * 初始化模态框功能
 */
function initModals() {
    // 关闭按钮
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // 点击模态框外部关闭
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
}

/**
 * 打开模态框
 * @param {HTMLElement} modal - 要打开的模态框元素
 */
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

/**
 * 关闭模态框
 * @param {HTMLElement} modal - 要关闭的模态框元素
 */
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * 打开客户详情模态框
 * @param {string} customerId - 客户ID
 */
function openCustomerDetailModal(customerId) {
    const modal = document.getElementById('customerDetailModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // 清空之前的内容
    modalBody.innerHTML = '';
    
    // 添加新内容
    modalBody.innerHTML = createCustomerDetailContent(customerId);
    
    // 初始化客户详情页面的标签页
    initCustomerDetailTabs();
    
    // 初始化客户评级雷达图
    const customerRating = getCustomerRatingData(customerId);
    drawCustomerRatingRadarChart('customerRatingChart', customerRating);
    
    // 打开模态框
    openModal(modal);
}

/**
 * 打开客户营销模态框
 * @param {string} customerId - 客户ID
 */
function openCustomerMarketingModal(customerId) {
    const modal = document.getElementById('customerMarketingModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // 清空之前的内容
    modalBody.innerHTML = '';
    
    // 添加新内容 - 营销表单
    modalBody.innerHTML = `
        <div class="marketing-form">
            <div class="form-group">
                <label class="form-label">营销方式</label>
                <select class="form-select">
                    <option value="phone">电话营销</option>
                    <option value="sms">短信营销</option>
                    <option value="visit">客户拜访</option>
                    <option value="event">活动邀请</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">营销产品</label>
                <select class="form-select">
                    <option value="loan1">秒贷</option>
                    <option value="loan2">电商贷</option>
                    <option value="loan3">小微保</option>
                    <option value="loan4">发薪贷</option>
                    <option value="loan4">其他</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">营销内容</label>
                <textarea class="form-textarea" placeholder="输入营销内容..."></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">预约时间</label>
                <input type="datetime-local" class="form-input">
            </div>
            <div class="form-buttons">
                <button class="cancel-button">取消</button>
                <button class="submit-button">提交</button>
            </div>
        </div>
    `;
    
    // 添加取消按钮事件
    const cancelButton = modalBody.querySelector('.cancel-button');
    cancelButton.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // 添加提交按钮事件
    const submitButton = modalBody.querySelector('.submit-button');
    submitButton.addEventListener('click', function() {
        alert('营销计划已提交！');
        closeModal(modal);
    });
    
    // 打开模态框
    openModal(modal);
}

/**
 * 打开任务详情模态框
 * @param {string} taskId - 任务ID
 */
function openTaskDetailModal(taskId) {
    const modal = document.getElementById('taskDetailModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // 清空之前的内容
    modalBody.innerHTML = '';
    
    // 模拟获取任务数据（实际应用中应从后端获取）
    const taskData = getTaskDetailData(taskId);
    
    // 添加新内容 - 任务详情
    modalBody.innerHTML = `
        <div class="task-detail">
            <div class="task-header">
                <h3>${taskData.title}</h3>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="task-priority ${taskData.priority}">${getTaskPriorityText(taskData.priority)}</span>
                    <span class="task-status-label ${taskData.status.replace(/\s+/g, '-').toLowerCase()}">${taskData.status}</span>
                </div>
            </div>
            
            <div class="task-info">
                <div class="info-row">
                    <div class="info-label">任务编号：</div>
                    <div class="info-value">TASK-${('000' + taskId).slice(-4)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">任务类型：</div>
                    <div class="info-value">${taskData.type}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">关联客户：</div>
                    <div class="info-value">${taskData.customer}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">创建时间：</div>
                    <div class="info-value">${taskData.createdTime}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">截止时间：</div>
                    <div class="info-value" ${isOverdue(taskData.deadline) ? 'style="color: var(--danger-color)"' : ''}>${taskData.deadline}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">优先级：</div>
                    <div class="info-value">${getTaskPriorityText(taskData.priority)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">分配人：</div>
                    <div class="info-value">${taskData.assignedBy}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">负责人：</div>
                    <div class="info-value">${taskData.assignedTo}</div>
                </div>
                <div class="info-row full-width">
                    <div class="info-label">任务描述：</div>
                    <div class="info-value">${taskData.description}</div>
                </div>
            </div>
            
            <div class="task-status">
                <h3>任务进度</h3>
                <div class="status-progress">
                    <div class="status-bar">
                        <div class="status-completed" style="width: ${taskData.progress}%;"></div>
                    </div>
                    <div class="status-text">${taskData.progress}%</div>
                </div>
            </div>
            
            ${taskData.status !== '已完成' ? `
            <div class="form-buttons">
                <button class="cancel-button" onclick="closeModal(document.getElementById('taskDetailModal'))">关闭</button>
                <button class="submit-button" onclick="completeTask('${taskId}')">标记为完成</button>
            </div>` : `
            <div class="form-buttons">
                <button class="cancel-button" onclick="closeModal(document.getElementById('taskDetailModal'))">关闭</button>
            </div>`}
        </div>
    `;
    
    // 打开模态框
    openModal(modal);
}

/**
 * 完成任务
 * @param {string} taskId - 任务ID
 */
function completeTask(taskId) {
    // 模拟完成任务操作（实际应用中应发送到后端）
    alert(`任务 TASK-${('000' + taskId).slice(-4)} 已标记为完成！`);
    
    // 关闭模态框
    closeModal(document.getElementById('taskDetailModal'));
    
    // 更新任务列表中的状态（简单模拟）
    const taskRows = document.querySelectorAll('.task-table tbody tr');
    if (taskRows && taskRows[parseInt(taskId) - 1]) {
        const statusCell = taskRows[parseInt(taskId) - 1].querySelector('td:nth-child(7)');
        if (statusCell) {
            statusCell.innerHTML = '<span class="task-status-label completed">已完成</span>';
        }
    }
}

/**
 * 获取优先级的中文文本
 * @param {string} priority - 优先级
 * @returns {string} 优先级中文文本
 */
function getTaskPriorityText(priority) {
    switch (priority) {
        case 'high': return '高';
        case 'medium': return '中';
        case 'low': return '低';
        default: return '未知';
    }
}

/**
 * 检查截止时间是否已过期
 * @param {string} deadline - 截止时间
 * @returns {boolean} 是否已过期
 */
function isOverdue(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return now > deadlineDate;
}

/**
 * 获取任务详情数据（模拟数据）
 * @param {string} taskId - 任务ID
 * @returns {Object} 任务详情数据
 */
function getTaskDetailData(taskId) {
    // 模拟任务数据
    const tasks = [
        {
            id: '1',
            title: '客户信用评估',
            type: '风控任务',
            customer: '杭州XX五六有限公司',
            createdTime: '2023-06-13 09:15',
            deadline: '2023-06-15 14:30',
            priority: 'high',
            status: '进行中',
            assignedBy: '张经理',
            assignedTo: '李客户经理',
            description: '对客户的信用状况、财务状况进行全面评估，完成信用报告。需要审核客户的财务报表、银行流水、信用记录等资料，形成风险评估报告。',
            progress: 75,
            lastUpdate: '李客户经理于 2023-06-14 10:30 更新了任务进度：已完成财务报表审核，正在分析银行流水数据。'
        },
        {
            id: '2',
            title: '贷款审批',
            type: '审批任务',
            customer: '宁波YY五六有限公司',
            createdTime: '2023-06-14 11:20',
            deadline: '2023-06-16 10:00',
            priority: 'medium',
            status: '待处理',
            assignedBy: '张经理',
            assignedTo: '王客户经理',
            description: '审核客户贷款申请材料，评估贷款风险，给出贷款审批建议。',
            progress: 30,
            lastUpdate: '王客户经理于 2023-06-14 15:45 更新了任务进度：已收到贷款申请材料，正在核实客户资质。'
        },
        {
            id: '3',
            title: '客户回访',
            type: '营销任务',
            customer: '温州ZZ运输有限公司',
            createdTime: '2023-06-14 14:30',
            deadline: '2023-06-20 15:30',
            priority: 'low',
            status: '未开始',
            assignedBy: '张经理',
            assignedTo: '赵客户经理',
            description: '回访老客户，了解客户近期经营情况和融资需求，提供相关金融产品建议。',
            progress: 0,
            lastUpdate: '任务尚未开始'
        },
        {
            id: '4',
            title: '风险客户回访',
            type: '风控任务',
            customer: '杭州AA五六有限公司',
            createdTime: '2023-06-13 16:45',
            deadline: '2023-06-15 16:00',
            priority: 'medium',
            status: '进行中',
            assignedBy: '张经理',
            assignedTo: '李客户经理',
            description: '针对近期有还款风险的客户进行回访，评估客户还款能力和意愿，制定风险防控措施。',
            progress: 50,
            lastUpdate: '李客户经理于 2023-06-14 14:20 更新了任务进度：已电话联系客户，约定明日上午现场走访。'
        },
        {
            id: '5',
            title: '合同签署',
            type: '合规任务',
            customer: '台州BB物流有限公司',
            createdTime: '2023-06-14 09:00',
            deadline: '2023-06-18 09:30',
            priority: 'high',
            status: '待处理',
            assignedBy: '张经理',
            assignedTo: '王客户经理',
            description: '与客户签署贷款合同，确保合同条款符合监管要求和内部风控标准。',
            progress: 20,
            lastUpdate: '王客户经理于 2023-06-14 16:30 更新了任务进度：合同文本已准备完毕，等待与客户最终确认。'
        }
    ];
    
    // 返回对应ID的任务数据
    return tasks.find(task => task.id === taskId) || tasks[0];
}

/**
 * 打开添加任务模态框
 */
function openAddTaskModal() {
    const modal = document.getElementById('addTaskModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // 清空之前的内容
    modalBody.innerHTML = '';
    
    // 添加新内容 - 添加任务表单
    modalBody.innerHTML = `
        <div class="add-task-form">
            <div class="form-group">
                <label class="form-label">任务名称</label>
                <input type="text" class="form-input" placeholder="输入任务名称">
            </div>
            <div class="form-group">
                <label class="form-label">任务类型</label>
                <select class="form-select">
                    <option value="risk">风控任务</option>
                    <option value="marketing">营销任务</option>
                    <option value="marketing">需求任务</option>
                    <option value="visit">客户拜访</option>
                    <option value="follow">跟进任务</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">关联客户</label>
                <select class="form-select">
                    <option value="">选择客户...</option>
                    <option value="1">杭州XX物流有限公司</option>
                    <option value="2">宁波YY物流有限公司</option>
                    <option value="3">温州ZZ物流有限公司</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">截止时间</label>
                <input type="datetime-local" class="form-input">
            </div>
            <div class="form-group">
                <label class="form-label">优先级</label>
                <select class="form-select">
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">负责人</label>
                <select class="form-select">
                    <option value="">选择负责人...</option>
                    <option value="1">李客户经理</option>
                    <option value="2">王客户经理</option>
                    <option value="3">赵客户经理</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">任务描述</label>
                <textarea class="form-textarea" placeholder="输入任务描述..."></textarea>
            </div>
            <div class="form-buttons">
                <button class="cancel-button">取消</button>
                <button class="submit-button">创建任务</button>
            </div>
        </div>
    `;
    
    // 添加取消按钮事件
    const cancelButton = modalBody.querySelector('.cancel-button');
    cancelButton.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // 添加提交按钮事件
    const submitButton = modalBody.querySelector('.submit-button');
    submitButton.addEventListener('click', function() {
        alert('任务已创建！');
        closeModal(modal);
    });
    
    // 打开模态框
    openModal(modal);
}

/**
 * 创建客户详情模态框的内容
 * @param {string} customerId - 客户ID
 * @returns {string} HTML内容
 */
function createCustomerDetailContent(customerId) {
    return `
        <div class="customer-detail-content">
            <!-- 客户评级 -->
            <div class="customer-rating">
                <h3 data-rating="A">客户综合评级</h3>
                <div class="radar-chart-container">
                    <canvas id="customerRatingChart"></canvas>
                </div>
            </div>
            
            <!-- 客户综合信息卡片 -->
            <div class="customer-summary-cards">
                <div class="summary-card finance">
                    <div class="summary-card-title">贷款余额</div>
                    <div class="summary-card-value">350万元</div>
                    <div class="summary-card-footer">
                        <span>较上月</span>
                        <span class="summary-card-change positive">+50万元</span>
                    </div>
                </div>
                <div class="summary-card credit">
                    <div class="summary-card-title">授信额度</div>
                    <div class="summary-card-value">500万元</div>
                    <div class="summary-card-footer">
                        <span>未使用</span>
                        <span class="summary-card-change">150万元</span>
                    </div>
                </div>
                <div class="summary-card business">
                    <div class="summary-card-title">合作产品数</div>
                    <div class="summary-card-value">5个</div>
                    <div class="summary-card-footer">
                        <span>较上年</span>
                        <span class="summary-card-change positive">+2个</span>
                    </div>
                </div>
                <div class="summary-card risk">
                    <div class="summary-card-title">逾期金额</div>
                    <div class="summary-card-value">0元</div>
                    <div class="summary-card-footer">
                        <span>风险评级</span>
                        <span class="summary-card-change positive">低风险</span>
                    </div>
                </div>
            </div>
            
            <!-- 客户信息 -->
            <div class="customer-info">
                <div class="tab-navigation">
                    <div class="tab active" data-tab="basic-info">企业基本信息</div>
                    <div class="tab" data-tab="business-info">经营信息</div>
                    <div class="tab" data-tab="premise-info">场地信息</div>
                    <div class="tab" data-tab="equipment-info">设备信息</div>
                    <div class="tab" data-tab="vehicle-info">车辆信息</div>
                    <div class="tab" data-tab="personnel-info">人员信息</div>
                    <div class="tab" data-tab="customer-info">客户信息</div>
                    <div class="tab" data-tab="controller-info">实控人信息</div>
                </div>
                
                <div class="tab-content active" id="basic-info-content">
                    <!-- 企业基本信息 -->
                    <h3>基本信息</h3>
                    <table class="info-table">
                        <tr>
                            <th>企业名称</th>
                            <td>杭州云恒科技有限公司</td>
                            <th>企业信用代码</th>
                            <td>91330106MA2CDX7Y3R</td>
                        </tr>
                        <tr>
                            <th>成立日期</th>
                            <td>2018-05-23</td>
                            <th>注册资本</th>
                            <td>5000万元</td>
                        </tr>
                        <tr>
                            <th>企业类型</th>
                            <td>有限责任公司</td>
                            <th>经营状态</th>
                            <td>正常营业</td>
                        </tr>
                        <tr>
                            <th>法定代表人</th>
                            <td>李明远</td>
                            <th>联系电话</th>
                            <td>13987654321</td>
                        </tr>
                        <tr>
                            <th>经营范围</th>
                            <td colspan="3">计算机软件开发，人工智能技术服务，大数据处理，云计算服务，信息系统集成，电子商务技术咨询</td>
                        </tr>
                        <tr>
                            <th>注册地址</th>
                            <td colspan="3">浙江省杭州市滨江区西兴路1819号智慧产业园B座12层</td>
                        </tr>
                    </table>
                    
                    <!-- 股东数据 -->
                    <h3>股东数据</h3>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>股东名称</th>
                                <th>股东类型</th>
                                <th>持股比例</th>
                                <th>认缴出资额(万元)</th>
                                <th>认缴出资日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>李明远</td>
                                <td>自然人</td>
                                <td>45%</td>
                                <td>2250</td>
                                <td>2018-06-15</td>
                            </tr>
                            <tr>
                                <td>王建国</td>
                                <td>自然人</td>
                                <td>25%</td>
                                <td>1250</td>
                                <td>2018-06-15</td>
                            </tr>
                            <tr>
                                <td>杭州晨光投资有限公司</td>
                                <td>企业法人</td>
                                <td>20%</td>
                                <td>1000</td>
                                <td>2019-03-20</td>
                            </tr>
                            <tr>
                                <td>浙江科创创业投资基金</td>
                                <td>有限合伙企业</td>
                                <td>10%</td>
                                <td>500</td>
                                <td>2020-08-12</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 企业对公账户流水 -->
                    <h3>企业对公账户流水</h3>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>银行名称</th>
                                <th>银行账户</th>
                                <th>平均值(万元)</th>
                                <th>六月流水</th>
                                <th>五月流水</th>
                                <th>四月流水</th>
                                <th>三月流水</th>
                                <th>二月流水</th>
                                <th>一月流水</th>
                                <th>更新时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>建设银行</td>
                                <td>3305 0168 8800 0001 234</td>
                                <td>367.5</td>
                                <td>425.6</td>
                                <td>382.3</td>
                                <td>356.7</td>
                                <td>345.2</td>
                                <td>358.9</td>
                                <td>336.3</td>
                                <td>2023-07-05</td>
                            </tr>
                            <tr>
                                <td>工商银行</td>
                                <td>1202 0215 0901 2345 678</td>
                                <td>215.8</td>
                                <td>245.3</td>
                                <td>228.7</td>
                                <td>205.6</td>
                                <td>193.4</td>
                                <td>210.5</td>
                                <td>211.3</td>
                                <td>2023-07-05</td>
                            </tr>
                            <tr>
                                <td>招商银行</td>
                                <td>5712 3456 7890 1234</td>
                                <td>128.3</td>
                                <td>142.8</td>
                                <td>135.2</td>
                                <td>126.7</td>
                                <td>118.5</td>
                                <td>122.9</td>
                                <td>123.7</td>
                                <td>2023-07-04</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 关联企业情况 -->
                    <h3>关联企业情况</h3>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>关联企业名称</th>
                                <th>行业类型</th>
                                <th>成立日期</th>
                                <th>注册资本</th>
                                <th>实际控制人</th>
                                <th>控制人关系</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>杭州数智信息技术有限公司</td>
                                <td>软件和信息技术服务</td>
                                <td>2017-03-18</td>
                                <td>1000万元</td>
                                <td>李明远</td>
                                <td>直接控股</td>
                            </tr>
                            <tr>
                                <td>浙江云极大数据科技有限公司</td>
                                <td>大数据服务</td>
                                <td>2019-08-25</td>
                                <td>2000万元</td>
                                <td>李明远</td>
                                <td>间接控股</td>
                            </tr>
                            <tr>
                                <td>杭州智联物联网科技有限公司</td>
                                <td>物联网技术</td>
                                <td>2020-05-12</td>
                                <td>1500万元</td>
                                <td>王建国</td>
                                <td>亲属关系</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="tab-content" id="business-info-content">
                    <h3>经营信息概览</h3>
                    
                    <!-- 网点KPI部分 -->
                    <h3>网点KPI数据</h3>
                    <div class="chart-container" style="margin-bottom: 20px;">
                        <canvas id="kpiTrendChart"></canvas>
                    </div>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>时间</th>
                                <th>2024年4月</th>
                                <th>2024年5月</th>
                                <th>2024年6月</th>
                                <th>2024年7月</th>
                                <th>2024年8月</th>
                                <th>2024年9月</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>KPI评分</td>
                                <td>68</td>
                                <td>59</td>
                                <td>86</td>
                                <td>52</td>
                                <td>86</td>
                                <td>50</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="info-table" style="margin-top: 10px;">
                        <thead>
                            <tr>
                                <th>时间</th>
                                <th>2024年10月</th>
                                <th>2024年11月</th>
                                <th>2024年12月</th>
                                <th>2025年1月</th>
                                <th>2025年2月</th>
                                <th>2025年3月</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>KPI评分</td>
                                <td>68</td>
                                <td>85</td>
                                <td>90</td>
                                <td>60</td>
                                <td>70</td>
                                <td>80</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 网点揽派件部分 -->
                    <h3>网点揽派件数据</h3>
                    <div class="chart-container" style="margin-bottom: 20px;">
                        <canvas id="deliveryTrendChart"></canvas>
                    </div>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>类型</th>
                                <th>2024年4月</th>
                                <th>2024年5月</th>
                                <th>2024年6月</th>
                                <th>2024年7月</th>
                                <th>2024年8月</th>
                                <th>2024年9月</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>揽件数</td>
                                <td>6800</td>
                                <td>5900</td>
                                <td>8600</td>
                                <td>5200</td>
                                <td>8600</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <td>派件数</td>
                                <td>9008</td>
                                <td>5009</td>
                                <td>8006</td>
                                <td>5002</td>
                                <td>8006</td>
                                <td>5000</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="info-table" style="margin-top: 10px;">
                        <thead>
                            <tr>
                                <th>类型</th>
                                <th>2024年10月</th>
                                <th>2024年11月</th>
                                <th>2024年12月</th>
                                <th>2025年1月</th>
                                <th>2025年2月</th>
                                <th>2025年3月</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>揽件数</td>
                                <td>6800</td>
                                <td>8500</td>
                                <td>9000</td>
                                <td>6000</td>
                                <td>7000</td>
                                <td>8000</td>
                            </tr>
                            <tr>
                                <td>派件数</td>
                                <td>6008</td>
                                <td>8005</td>
                                <td>9000</td>
                                <td>6000</td>
                                <td>7000</td>
                                <td>8000</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 继续添加其他部分... -->
                    
                    <!-- 金刚账户预警部分 -->
                    <h3>金刚账户预警数据</h3>
                    <div class="chart-container" style="margin-bottom: 20px;">
                        <canvas id="accountAlertChart"></canvas>
                    </div>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>账户类型</th>
                                <th>预警金额(元)</th>
                                <th>当前余额(元)</th>
                                <th>预警原因</th>
                                <th>处理状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-03-28</td>
                                <td>结算账户</td>
                                <td>25000</td>
                                <td>18500</td>
                                <td>余额不足</td>
                                <td>已处理</td>
                            </tr>
                            <tr>
                                <td>2025-03-25</td>
                                <td>保证金账户</td>
                                <td>50000</td>
                                <td>42500</td>
                                <td>余额预警</td>
                                <td>已处理</td>
                            </tr>
                            <tr>
                                <td>2025-03-20</td>
                                <td>运营账户</td>
                                <td>30000</td>
                                <td>28600</td>
                                <td>接近预警线</td>
                                <td>监控中</td>
                            </tr>
                            <tr>
                                <td>2025-03-15</td>
                                <td>结算账户</td>
                                <td>25000</td>
                                <td>21200</td>
                                <td>余额下降</td>
                                <td>已处理</td>
                            </tr>
                            <tr>
                                <td>2025-03-10</td>
                                <td>运营账户</td>
                                <td>30000</td>
                                <td>26800</td>
                                <td>接近预警线</td>
                                <td>已处理</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 金刚预警部分 -->
                    <h3>金刚预警数据</h3>
                    <div class="chart-container" style="margin-bottom: 20px;">
                        <canvas id="kinggloryAlertChart"></canvas>
                    </div>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>预警类型</th>
                                <th>2024年4-6月</th>
                                <th>2024年7-9月</th>
                                <th>2024年10-12月</th>
                                <th>2025年1-3月</th>
                                <th>合计</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>执行预警次数</td>
                                <td>12</td>
                                <td>8</td>
                                <td>10</td>
                                <td>6</td>
                                <td>36</td>
                            </tr>
                            <tr>
                                <td>设置临时开通天数次数</td>
                                <td>5</td>
                                <td>7</td>
                                <td>4</td>
                                <td>8</td>
                                <td>24</td>
                            </tr>
                            <tr>
                                <td>修改预警金额</td>
                                <td>3</td>
                                <td>2</td>
                                <td>5</td>
                                <td>4</td>
                                <td>14</td>
                            </tr>
                            <tr>
                                <td>冻结次数</td>
                                <td>2</td>
                                <td>1</td>
                                <td>0</td>
                                <td>1</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>解冻次数</td>
                                <td>2</td>
                                <td>1</td>
                                <td>0</td>
                                <td>1</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>冻结账户资金次数</td>
                                <td>1</td>
                                <td>0</td>
                                <td>1</td>
                                <td>0</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>解冻账户资金次数</td>
                                <td>1</td>
                                <td>0</td>
                                <td>1</td>
                                <td>0</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 风险评级部分 -->
                    <h3>风险评级数据</h3>
                    <div class="chart-container" style="margin-bottom: 20px;">
                        <canvas id="riskRatingChart"></canvas>
                    </div>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>评级类型</th>
                                <th>2024年第1季度</th>
                                <th>2024年第2季度</th>
                                <th>2024年第3季度</th>
                                <th>2024年第4季度</th>
                                <th>2025年第1季度</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>综合风险星级</td>
                                <td>★★★☆☆</td>
                                <td>★★★★☆</td>
                                <td>★★★☆☆</td>
                                <td>★★★★☆</td>
                                <td>★★★★★</td>
                            </tr>
                            <tr>
                                <td>KPI星级</td>
                                <td>★★★☆☆</td>
                                <td>★★★☆☆</td>
                                <td>★★★★☆</td>
                                <td>★★★★★</td>
                                <td>★★★★☆</td>
                            </tr>
                            <tr>
                                <td>单票罚款星级</td>
                                <td>★★★★☆</td>
                                <td>★★★★★</td>
                                <td>★★★★☆</td>
                                <td>★★★★★</td>
                                <td>★★★★★</td>
                            </tr>
                            <tr>
                                <td>欠薪月数星级</td>
                                <td>★★★★★</td>
                                <td>★★★★★</td>
                                <td>★★★★★</td>
                                <td>★★★★☆</td>
                                <td>★★★★★</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 预转让数据部分 -->
                    <h3>预转让数据</h3>
                    <table class="info-table">
                        <tr>
                            <th>累计预转让次数</th>
                            <td>2</td>
                            <th>流程完结日期</th>
                            <td>2024-05-05</td>
                        </tr>
                        <tr>
                            <th>优化方式</th>
                            <td>划分</td>
                            <th>受让方姓名</th>
                            <td>张三</td>
                        </tr>
                    </table>
                    
                    <!-- 退网数据部分 -->
                    <h3>退网数据</h3>
                    <table class="info-table">
                        <tr>
                            <th>累计退网次数</th>
                            <td>2</td>
                            <th>退网时间</th>
                            <td>2024-05-05</td>
                        </tr>
                        <tr>
                            <th>处理结果</th>
                            <td>划分</td>
                            <th>转让价格（万元）</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th>退网原因</th>
                            <td>经营不善</td>
                            <th>退网备注</th>
                            <td>资金链短缺</td>
                        </tr>
                    </table>
                    
                    <!-- 预警数据部分 -->
                    <h3>预警数据</h3>
                    <table class="info-table">
                        <tr>
                            <th>累计预警次数</th>
                            <td>2</td>
                            <th>最近预警时间</th>
                            <td>2025-01-01</td>
                        </tr>
                        <tr>
                            <th>异常分类</th>
                            <td>经营与管理风险</td>
                            <th>异常明细</th>
                            <td>管理混乱</td>
                        </tr>
                    </table>
                    
                    <!-- 共配数据部分 -->
                    <h3>共配数据</h3>
                    <table class="info-table">
                        <tr>
                            <th>共配反馈次数</th>
                            <td>2</td>
                            <th>最新共配反馈时间</th>
                            <td>2024-12-12 09:00:00</td>
                        </tr>
                        <tr>
                            <th>共配主导方</th>
                            <td>圆通</td>
                            <th>共配品牌</th>
                            <td>圆通、中通</td>
                        </tr>
                        <tr>
                            <th>共配方式</th>
                            <td colspan="3">联合经营</td>
                        </tr>
                    </table>
                    
                    <!-- 小贷余额数据部分 -->
                    <h3>小贷余额数据</h3>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>产品</th>
                                <th>借款次数</th>
                                <th>首次借款时间</th>
                                <th>最近借款时间</th>
                                <th>借款频率/月</th>
                                <th>累计放款金额(元)</th>
                                <th>平均借款金额(元)</th>
                                <th>本金余额(元)</th>
                                <th>是否逾期过</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>经营贷</td>
                                <td>8</td>
                                <td>2023-05-10</td>
                                <td>2025-02-15</td>
                                <td>0.35</td>
                                <td>2,800,000</td>
                                <td>350,000</td>
                                <td>580,000</td>
                                <td>否</td>
                            </tr>
                            <tr>
                                <td>流动资金贷</td>
                                <td>5</td>
                                <td>2024-01-18</td>
                                <td>2025-03-05</td>
                                <td>0.33</td>
                                <td>1,500,000</td>
                                <td>300,000</td>
                                <td>300,000</td>
                                <td>否</td>
                            </tr>
                            <tr>
                                <td>设备贷</td>
                                <td>1</td>
                                <td>2024-09-25</td>
                                <td>2024-09-25</td>
                                <td>-</td>
                                <td>500,000</td>
                                <td>500,000</td>
                                <td>400,000</td>
                                <td>否</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="tab-content" id="premise-info-content">
                    <h3>场地信息总览</h3>
                    
                    <!-- 统计看板部分 -->
                    <div class="premise-stats-container" style="margin-bottom: 25px;">
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="premiseStatsChart"></canvas>
                        </div>
                        <div class="premise-stats-summary" style="display: flex; justify-content: space-between; margin-top: 15px;">
                            <div class="stat-card" style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; width: 22%; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 4px solid var(--primary-color);">
                                <div style="font-size: 14px; color: var(--gray-color);">场地总数量</div>
                                <div style="font-size: 24px; font-weight: 600; color: var(--primary-color); margin-top: 5px;">8</div>
                            </div>
                            <div class="stat-card" style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; width: 22%; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 4px solid var(--orange-color);">
                                <div style="font-size: 14px; color: var(--gray-color);">年租金总额（万元）</div>
                                <div style="font-size: 24px; font-weight: 600; color: var(--orange-color); margin-top: 5px;">180</div>
                            </div>
                            <div class="stat-card" style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; width: 22%; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 4px solid var(--teal-color);">
                                <div style="font-size: 14px; color: var(--gray-color);">设备估值总额（万元）</div>
                                <div style="font-size: 24px; font-weight: 600; color: var(--teal-color); margin-top: 5px;">950</div>
                            </div>
                            <div class="stat-card" style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; width: 22%; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 4px solid var(--success-color);">
                                <div style="font-size: 14px; color: var(--gray-color);">场地融资总余额（万元）</div>
                                <div style="font-size: 24px; font-weight: 600; color: var(--success-color); margin-top: 5px;">620</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 租赁场地部分 -->
                    <div class="rental-premises" style="margin-bottom: 30px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <h3>租赁场地</h3>
                            <button class="add-button" style="background-color: var(--success-color); color: white; border: none; border-radius: 4px; padding: 6px 12px; cursor: pointer; font-size: 14px;">+ 新增场地</button>
                        </div>
                        <table class="info-table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>面积(㎡)</th>
                                    <th>使用年限</th>
                                    <th>租期</th>
                                    <th>支付方式</th>
                                    <th>年租金(万元)</th>
                                    <th>起租年份</th>
                                    <th>付租时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2000</td>
                                    <td>5年</td>
                                    <td>2021-01-01至2025-12-31</td>
                                    <td>按季度</td>
                                    <td>60</td>
                                    <td>2021</td>
                                    <td>每季度首月1日</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>1500</td>
                                    <td>3年</td>
                                    <td>2022-03-01至2025-02-28</td>
                                    <td>按月</td>
                                    <td>45</td>
                                    <td>2022</td>
                                    <td>每月5日</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>1200</td>
                                    <td>2年</td>
                                    <td>2023-06-01至2025-05-31</td>
                                    <td>按年</td>
                                    <td>36</td>
                                    <td>2023</td>
                                    <td>每年6月1日</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>800</td>
                                    <td>4年</td>
                                    <td>2021-10-01至2025-09-30</td>
                                    <td>按半年</td>
                                    <td>24</td>
                                    <td>2021</td>
                                    <td>每半年首月15日</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>500</td>
                                    <td>1年</td>
                                    <td>2024-01-01至2024-12-31</td>
                                    <td>按月</td>
                                    <td>15</td>
                                    <td>2024</td>
                                    <td>每月1日</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- 自购场地部分 -->
                    <div class="purchased-premises">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <h3>自购场地</h3>
                            <button class="add-button" style="background-color: var(--success-color); color: white; border: none; border-radius: 4px; padding: 6px 12px; cursor: pointer; font-size: 14px;">+ 新增场地</button>
                        </div>
                        <table class="info-table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>面积(㎡)</th>
                                    <th>使用年限</th>
                                    <th>抵押情况</th>
                                    <th>购置价格(万元)</th>
                                    <th>当前估值(万元)</th>
                                    <th>融资余额(万元)</th>
                                    <th>购买年份</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>3000</td>
                                    <td>40年</td>
                                    <td>已抵押</td>
                                    <td>600</td>
                                    <td>750</td>
                                    <td>400</td>
                                    <td>2019</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>1800</td>
                                    <td>50年</td>
                                    <td>未抵押</td>
                                    <td>350</td>
                                    <td>420</td>
                                    <td>0</td>
                                    <td>2020</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>2200</td>
                                    <td>45年</td>
                                    <td>已抵押</td>
                                    <td>450</td>
                                    <td>520</td>
                                    <td>220</td>
                                    <td>2018</td>
                                    <td>
                                        <button class="table-action-button edit-button">编辑</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="tab-content" id="equipment-info-content">
                    <h3>设备信息</h3>
                    <table class="info-table">
                        <tr>
                            <th>服务器数量</th>
                            <td>50台</td>
                            <th>电脑设备</th>
                            <td>150台</td>
                        </tr>
                        <tr>
                            <th>网络设备</th>
                            <td>30台</td>
                            <th>其他设备</th>
                            <td>20台</td>
                        </tr>
                        <tr>
                            <th>设备总值</th>
                            <td colspan="3">约500万元</td>
                        </tr>
                    </table>
                </div>
                
                <div class="tab-content" id="vehicle-info-content">
                    <h3>车辆信息</h3>
                    
                    <!-- 统计看板部分 -->
                    <div class="chart-container" style="height: 300px; margin-bottom: 20px;">
                        <canvas id="vehicleStatsChart"></canvas>
                    </div>
                    
                    <!-- 租赁车辆部分 -->
                    <h3>租赁车辆</h3>
                    <div class="table-actions" style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
                        <button class="action-button add-button" onclick="alert('添加租赁车辆功能')">添加</button>
                    </div>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>品牌</th>
                                <th>规格</th>
                                <th>起租年份</th>
                                <th>租赁期限</th>
                                <th>支付方式</th>
                                <th>月租金(万元)</th>
                                <th>数量</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>奥迪</td>
                                <td>A6L</td>
                                <td>2022</td>
                                <td>3年</td>
                                <td>月付</td>
                                <td>1.5</td>
                                <td>2</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="edit-button" onclick="alert('编辑租赁车辆功能')">修改</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>宝马</td>
                                <td>530Li</td>
                                <td>2023</td>
                                <td>2年</td>
                                <td>季付</td>
                                <td>1.8</td>
                                <td>1</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="edit-button" onclick="alert('编辑租赁车辆功能')">修改</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>丰田</td>
                                <td>凯美瑞</td>
                                <td>2021</td>
                                <td>4年</td>
                                <td>年付</td>
                                <td>0.6</td>
                                <td>3</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="edit-button" onclick="alert('编辑租赁车辆功能')">修改</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- 自购车辆部分 -->
                    <h3>自购车辆</h3>
                    <div class="table-actions" style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
                        <button class="action-button add-button" onclick="alert('添加自购车辆功能')">添加</button>
                    </div>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>购买年份</th>
                                <th>品牌</th>
                                <th>规格</th>
                                <th>数量</th>
                                <th>购置价格(万元)</th>
                                <th>抵押情况</th>
                                <th>资金来源</th>
                                <th>融资余额(万元)</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2020</td>
                                <td>奔驰</td>
                                <td>E300L</td>
                                <td>2</td>
                                <td>65</td>
                                <td>部分抵押</td>
                                <td>银行贷款</td>
                                <td>28</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="edit-button" onclick="alert('编辑自购车辆功能')">修改</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>2021</td>
                                <td>大众</td>
                                <td>帕萨特</td>
                                <td>4</td>
                                <td>88</td>
                                <td>无抵押</td>
                                <td>自有资金</td>
                                <td>0</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="edit-button" onclick="alert('编辑自购车辆功能')">修改</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>2019</td>
                                <td>福特</td>
                                <td>蒙迪欧</td>
                                <td>3</td>
                                <td>54</td>
                                <td>全部抵押</td>
                                <td>融资租赁</td>
                                <td>12</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="edit-button" onclick="alert('编辑自购车辆功能')">修改</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="tab-content" id="personnel-info-content">
                    <h3>人员信息</h3>
                    <table class="info-table">
                        <tr>
                            <th>总人数</th>
                            <td>120人</td>
                            <th>研发人员</th>
                            <td>80人</td>
                        </tr>
                        <tr>
                            <th>销售人员</th>
                            <td>20人</td>
                            <th>行政人员</th>
                            <td>15人</td>
                        </tr>
                        <tr>
                            <th>管理人员</th>
                            <td colspan="3">5人</td>
                        </tr>
                    </table>
                </div>
                
                <div class="tab-content" id="customer-info-content">
                    <h3>客户信息</h3>
                    <table class="info-table">
                        <tr>
                            <th>合作开始时间</th>
                            <td>2018-05-15</td>
                            <th>客户经理</th>
                            <td>李客户经理</td>
                        </tr>
                        <tr>
                            <th>贷款产品</th>
                            <td>小微企业贷款、科技创新贷款</td>
                            <th>最近跟进时间</th>
                            <td>2023-06-10</td>
                        </tr>
                        <tr>
                            <th>风险等级</th>
                            <td>低风险</td>
                            <th>客户评级</th>
                            <td>A</td>
                        </tr>
                        <tr>
                            <th>合作备注</th>
                            <td colspan="3">优质科技企业，发展稳定，现金流良好，还款能力强</td>
                        </tr>
                    </table>
                </div>
                
                <div class="tab-content" id="controller-info-content">
                    <h3>实控人信息</h3>
                    <table class="info-table">
                        <tr>
                            <th>姓名</th>
                            <td>张三</td>
                            <th>联系电话</th>
                            <td>13812345678</td>
                        </tr>
                        <tr>
                            <th>证件类型</th>
                            <td>身份证</td>
                            <th>证件号码</th>
                            <td>330XXXXXXXXXXX</td>
                        </tr>
                        <tr>
                            <th>教育背景</th>
                            <td>浙江大学</td>
                            <th>专业</th>
                            <td>计算机科学</td>
                        </tr>
                        <tr>
                            <th>从业经历</th>
                            <td colspan="3">2010-2015年在阿里巴巴担任技术主管，2015年创立杭州XX科技有限公司</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
}

/**
 * 初始化客户详情页面的标签页切换功能
 */
function initCustomerDetailTabs() {
    const tabs = document.querySelectorAll('.customer-info .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除当前激活状态
            document.querySelector('.customer-info .tab.active').classList.remove('active');
            
            // 设置新的激活项
            this.classList.add('active');
            
            // 获取要显示的内容ID
            const contentId = this.getAttribute('data-tab') + '-content';
            
            // 隐藏当前内容
            document.querySelector('.customer-info .tab-content.active').classList.remove('active');
            
            // 显示新内容
            document.getElementById(contentId).classList.add('active');
            
            // 如果是经营信息标签，初始化所有图表
            if (contentId === 'business-info-content') {
                // 初始化KPI趋势图
                const kpiData = {
                    months: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
                    values: [68, 59, 86, 52, 86, 50, 68, 85, 90, 60, 70, 80]
                };
                drawKpiTrendChart('kpiTrendChart', kpiData);
                
                // 初始化揽派件趋势图
                const deliveryData = {
                    months: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
                    pickupValues: [6800, 5900, 8600, 5200, 8600, 5000, 6800, 8500, 9000, 6000, 7000, 8000],
                    deliveryValues: [9008, 5009, 8006, 5002, 8006, 5000, 6008, 8005, 9000, 6000, 7000, 8000]
                };
                drawDeliveryTrendChart('deliveryTrendChart', deliveryData);
                
                // 初始化金刚账户预警图表
                const accountAlertData = {
                    dates: ['3/1', '3/5', '3/10', '3/15', '3/20', '3/25', '3/28'],
                    values: [25000, 22000, 26800, 21200, 28600, 42500, 18500]
                };
                drawAccountAlertChart('accountAlertChart', accountAlertData);
                
                // 初始化金刚预警数据图表
                const kinggloryAlertData = {
                    categories: ['执行预警次数', '临时开通次数', '修改预警金额', '冻结次数', '解冻次数', '冻结资金次数', '解冻资金次数'],
                    quarters: ['2024年Q2', '2024年Q3', '2024年Q4', '2025年Q1'],
                    series: [
                        [12, 8, 10, 6],
                        [5, 7, 4, 8],
                        [3, 2, 5, 4],
                        [2, 1, 0, 1],
                        [2, 1, 0, 1],
                        [1, 0, 1, 0],
                        [1, 0, 1, 0]
                    ]
                };
                drawKinggloryAlertChart('kinggloryAlertChart', kinggloryAlertData);
                
                // 初始化风险评级图表
                const riskRatingData = {
                    categories: ['综合风险星级', 'KPI星级', '单票罚款星级', '欠薪月数星级'],
                    quarters: ['2024年Q1', '2024年Q2', '2024年Q3', '2024年Q4', '2025年Q1'],
                    series: [
                        [3, 4, 3, 4, 5],
                        [3, 3, 4, 5, 4],
                        [4, 5, 4, 5, 5],
                        [5, 5, 5, 4, 5]
                    ]
                };
                drawRiskRatingChart('riskRatingChart', riskRatingData);
            }
            
            // 如果是场地信息标签，初始化场地统计图表
            if (contentId === 'premise-info-content') {
                const premiseStatsData = {
                    labels: ['场地总数量', '年租金总额', '设备估值总额', '场地融资总余额'],
                    values: [8, 180, 950, 620],
                    colors: [
                        'rgba(101, 62, 179, 0.7)',  // 紫色(主色)
                        'rgba(242, 131, 53, 0.7)',  // 橙色
                        'rgba(86, 160, 176, 0.7)',  // 蓝绿色
                        'rgba(59, 185, 80, 0.7)'    // 绿色
                    ]
                };
                drawPremiseStatsChart('premiseStatsChart', premiseStatsData);
                
                // 为表格中的按钮添加事件
                initPremiseTableButtons();
            }
            
            // 如果是车辆信息标签，初始化车辆统计图表
            if (contentId === 'vehicle-info-content') {
                const vehicleStatsData = {
                    labels: ['总车辆数量', '月租金总额', '车辆总价值', '融资总余额'],
                    values: [15, 3.9, 207, 40],
                    colors: [
                        'rgba(101, 62, 179, 0.7)',  // 紫色(主色)
                        'rgba(242, 131, 53, 0.7)',  // 橙色
                        'rgba(86, 160, 176, 0.7)',  // 蓝绿色
                        'rgba(59, 185, 80, 0.7)'    // 绿色
                    ]
                };
                drawVehicleStatsChart('vehicleStatsChart', vehicleStatsData);
            }
        });
    });
}

/**
 * 绘制KPI趋势图
 * @param {string} canvasId - Canvas元素ID
 * @param {Object} data - 图表数据
 */
function drawKpiTrendChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.months,
            datasets: [{
                label: 'KPI评分',
                data: data.values,
                backgroundColor: 'rgba(101, 62, 179, 0.2)',
                borderColor: 'rgba(101, 62, 179, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(101, 62, 179, 1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

/**
 * 绘制揽派件趋势图
 * @param {string} canvasId - Canvas元素ID
 * @param {Object} data - 图表数据
 */
function drawDeliveryTrendChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.months,
            datasets: [{
                label: '揽件数',
                data: data.pickupValues,
                backgroundColor: 'rgba(235, 153, 27, 0.2)',
                borderColor: 'rgba(235, 153, 27, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(235, 153, 27, 1)',
                tension: 0.3
            }, {
                label: '派件数',
                data: data.deliveryValues,
                backgroundColor: 'rgba(59, 185, 80, 0.2)',
                borderColor: 'rgba(59, 185, 80, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 185, 80, 1)',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

/**
 * 绘制金刚账户预警图表
 * @param {string} canvasId - Canvas元素ID
 * @param {Object} data - 图表数据
 */
function drawAccountAlertChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.dates,
            datasets: [{
                label: '预警金额(元)',
                data: data.values,
                backgroundColor: 'rgba(243, 82, 82, 0.6)',
                borderColor: 'rgba(243, 82, 82, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + '元';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 绘制金刚预警数据图表
 * @param {string} canvasId - Canvas元素ID
 * @param {Object} data - 图表数据
 */
function drawKinggloryAlertChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const datasets = [];
    
    for (let i = 0; i < data.categories.length; i++) {
        datasets.push({
            label: data.categories[i],
            data: data.series[i],
            backgroundColor: getRandomColor(i),
            borderWidth: 1
        });
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.quarters,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

/**
 * 绘制风险评级图表
 * @param {string} canvasId - Canvas元素ID
 * @param {Object} data - 图表数据
 */
function drawRiskRatingChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const datasets = [];
    
    for (let i = 0; i < data.categories.length; i++) {
        datasets.push({
            label: data.categories[i],
            data: data.series[i],
            backgroundColor: getRandomColor(i, 0.6),
            borderColor: getRandomColor(i),
            borderWidth: 2
        });
    }
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: data.quarters,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    stepSize: 1
                }
            }
        }
    });
}

/**
 * 获取随机颜色
 * @param {number} index - 颜色索引
 * @param {number} alpha - 透明度 (0-1)
 * @returns {string} 颜色值
 */
function getRandomColor(index, alpha = 1) {
    const colors = [
        `rgba(101, 62, 179, ${alpha})`,  // 紫色
        `rgba(59, 185, 80, ${alpha})`,   // 绿色
        `rgba(235, 153, 27, ${alpha})`,  // 橙色
        `rgba(243, 82, 82, ${alpha})`,   // 红色
        `rgba(86, 160, 176, ${alpha})`,  // 蓝绿色
        `rgba(131, 131, 131, ${alpha})`, // 灰色
        `rgba(221, 102, 180, ${alpha})`, // 粉色
        `rgba(59, 122, 185, ${alpha})`,  // 蓝色
    ];
    
    return colors[index % colors.length];
}

/**
 * 获取客户评级数据
 * @param {string} customerId - 客户ID
 * @returns {Object} 评级数据
 */
function getCustomerRatingData(customerId) {
    // 在实际应用中，这里应该是从后端API获取数据
    // 这里返回模拟数据
    return {
        assetLevel: 85,
        creditHistory: 75,
        performanceCapability: 90,
        behaviorPreference: 65,
        customerRelationship: 80
    };
}

/**
 * 加载客户管理页面内容
 */
function loadCustomerPage() {
    const page = document.getElementById('customer-page');
    
    page.innerHTML = `
        <div class="customer-management">
            <div class="customer-list-header">
                <div class="customer-list-title">客户管理</div>
                <div class="customer-search">
                    <input type="text" class="search-input" placeholder="搜索客户名称、联系人...">
                    <button class="search-button">搜索</button>
                </div>
            </div>
            
            <div class="customer-category-tags">
                <div class="category-tag active">全部客户</div>
                <div class="category-tag">重点客户</div>
                <div class="category-tag">新增客户</div>
                <div class="category-tag">潜在风险</div>
                <div class="category-tag">长期合作</div>
                <div class="category-tag">战略伙伴</div>
            </div>
            
            <div class="customer-view-toggle">
                <button class="view-toggle-btn active" data-view="table">表格视图</button>
                <button class="view-toggle-btn" data-view="card">卡片视图</button>
            </div>
            
            <div class="customer-view-container">
                <!-- 表格视图 -->
                <table class="customer-table" id="customer-table-view">
                    <thead>
                        <tr>
                            <th>客户名称</th>
                            <th>联系人</th>
                            <th>联系电话</th>
                            <th>客户评级</th>
                            <th>合作年限</th>
                            <th>授信额度(万元)</th>
                            <th>贷款余额(万元)</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>杭州XX物流有限公司</td>
                            <td>张三</td>
                            <td>13812345678</td>
                            <td><span class="customer-rating-label customer-rating-A">A</span></td>
                            <td>5年</td>
                            <td>500</td>
                            <td>350</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="detail-button" onclick="openCustomerDetailModal('1')">详情</button>
                                    <button class="marketing-button" onclick="openCustomerMarketingModal('1')">营销</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>宁波YY物流有限公司</td>
                            <td>李四</td>
                            <td>13923456789</td>
                            <td><span class="customer-rating-label customer-rating-B">B</span></td>
                            <td>3年</td>
                            <td>300</td>
                            <td>200</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="detail-button" onclick="openCustomerDetailModal('2')">详情</button>
                                    <button class="marketing-button" onclick="openCustomerMarketingModal('2')">营销</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>温州ZZ物流有限公司</td>
                            <td>王五</td>
                            <td>13734567890</td>
                            <td><span class="customer-rating-label customer-rating-A">A</span></td>
                            <td>7年</td>
                            <td>800</td>
                            <td>550</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="detail-button" onclick="openCustomerDetailModal('3')">详情</button>
                                    <button class="marketing-button" onclick="openCustomerMarketingModal('3')">营销</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>杭州AA运输有限公司</td>
                            <td>赵六</td>
                            <td>13845678901</td>
                            <td><span class="customer-rating-label customer-rating-C">C</span></td>
                            <td>2年</td>
                            <td>200</td>
                            <td>150</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="detail-button" onclick="openCustomerDetailModal('4')">详情</button>
                                    <button class="marketing-button" onclick="openCustomerMarketingModal('4')">营销</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>台州BB物流有限公司</td>
                            <td>孙七</td>
                            <td>13956789012</td>
                            <td><span class="customer-rating-label customer-rating-B">B</span></td>
                            <td>4年</td>
                            <td>400</td>
                            <td>300</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="detail-button" onclick="openCustomerDetailModal('5')">详情</button>
                                    <button class="marketing-button" onclick="openCustomerMarketingModal('5')">营销</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- 卡片视图 -->
                <div class="customer-cards" id="customer-card-view" style="display: none;">
                    <!-- 客户卡片1 -->
                    <div class="customer-card">
                        <div class="customer-card-header">
                            <div class="customer-card-name">杭州XX科技有限公司</div>
                            <span class="customer-rating-label customer-rating-A">A</span>
                        </div>
                        <div class="customer-card-content">
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系人</div>
                                <div class="customer-card-value">张三</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系电话</div>
                                <div class="customer-card-value">13812345678</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">合作年限</div>
                                <div class="customer-card-value">5年</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">贷款余额</div>
                                <div class="customer-card-value">350万元</div>
                            </div>
                        </div>
                        <div class="customer-card-footer">
                            <div class="customer-card-actions">
                                <button class="detail-button" onclick="openCustomerDetailModal('1')">详情</button>
                                <button class="marketing-button" onclick="openCustomerMarketingModal('1')">营销</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 客户卡片2 -->
                    <div class="customer-card">
                        <div class="customer-card-header">
                            <div class="customer-card-name">宁波YY贸易有限公司</div>
                            <span class="customer-rating-label customer-rating-B">B</span>
                        </div>
                        <div class="customer-card-content">
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系人</div>
                                <div class="customer-card-value">李四</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系电话</div>
                                <div class="customer-card-value">13923456789</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">合作年限</div>
                                <div class="customer-card-value">3年</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">贷款余额</div>
                                <div class="customer-card-value">200万元</div>
                            </div>
                        </div>
                        <div class="customer-card-footer">
                            <div class="customer-card-actions">
                                <button class="detail-button" onclick="openCustomerDetailModal('2')">详情</button>
                                <button class="marketing-button" onclick="openCustomerMarketingModal('2')">营销</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 客户卡片3 -->
                    <div class="customer-card">
                        <div class="customer-card-header">
                            <div class="customer-card-name">温州ZZ物流有限公司</div>
                            <span class="customer-rating-label customer-rating-A">A</span>
                        </div>
                        <div class="customer-card-content">
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系人</div>
                                <div class="customer-card-value">王五</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系电话</div>
                                <div class="customer-card-value">13734567890</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">合作年限</div>
                                <div class="customer-card-value">7年</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">贷款余额</div>
                                <div class="customer-card-value">550万元</div>
                            </div>
                        </div>
                        <div class="customer-card-footer">
                            <div class="customer-card-actions">
                                <button class="detail-button" onclick="openCustomerDetailModal('3')">详情</button>
                                <button class="marketing-button" onclick="openCustomerMarketingModal('3')">营销</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 客户卡片4 -->
                    <div class="customer-card">
                        <div class="customer-card-header">
                            <div class="customer-card-name">杭州AA电子商务有限公司</div>
                            <span class="customer-rating-label customer-rating-C">C</span>
                        </div>
                        <div class="customer-card-content">
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系人</div>
                                <div class="customer-card-value">赵六</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系电话</div>
                                <div class="customer-card-value">13845678901</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">合作年限</div>
                                <div class="customer-card-value">2年</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">贷款余额</div>
                                <div class="customer-card-value">150万元</div>
                            </div>
                        </div>
                        <div class="customer-card-footer">
                            <div class="customer-card-actions">
                                <button class="detail-button" onclick="openCustomerDetailModal('4')">详情</button>
                                <button class="marketing-button" onclick="openCustomerMarketingModal('4')">营销</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 客户卡片5 -->
                    <div class="customer-card">
                        <div class="customer-card-header">
                            <div class="customer-card-name">台州BB物流有限公司</div>
                            <span class="customer-rating-label customer-rating-B">B</span>
                        </div>
                        <div class="customer-card-content">
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系人</div>
                                <div class="customer-card-value">孙七</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">联系电话</div>
                                <div class="customer-card-value">13956789012</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">合作年限</div>
                                <div class="customer-card-value">4年</div>
                            </div>
                            <div class="customer-card-item">
                                <div class="customer-card-label">贷款余额</div>
                                <div class="customer-card-value">300万元</div>
                            </div>
                        </div>
                        <div class="customer-card-footer">
                            <div class="customer-card-actions">
                                <button class="detail-button" onclick="openCustomerDetailModal('5')">详情</button>
                                <button class="marketing-button" onclick="openCustomerMarketingModal('5')">营销</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pagination">
                <button class="page-button prev-button">上一页</button>
                <div class="page-numbers">
                    <span class="page-number active">1</span>
                    <span class="page-number">2</span>
                    <span class="page-number">3</span>
                </div>
                <button class="page-button next-button">下一页</button>
            </div>
        </div>
    `;
    
    // 绑定客户管理页面的交互事件
    bindCustomerPageEvents();
}

/**
 * 绑定客户管理页面的交互事件
 */
function bindCustomerPageEvents() {
    // 分类标签点击事件
    const categoryTags = document.querySelectorAll('.category-tag');
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 移除所有标签的active类
            categoryTags.forEach(t => t.classList.remove('active'));
            // 添加当前标签的active类
            this.classList.add('active');
            // 这里可以添加实际筛选逻辑
        });
    });
    
    // 视图切换按钮点击事件
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    const tableView = document.getElementById('customer-table-view');
    const cardView = document.getElementById('customer-card-view');
    
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 切换视图显示
            const viewType = this.getAttribute('data-view');
            if (viewType === 'table') {
                tableView.style.display = 'table';
                cardView.style.display = 'none';
            } else if (viewType === 'card') {
                tableView.style.display = 'none';
                cardView.style.display = 'grid';
            }
        });
    });
    
    // 搜索按钮点击事件
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                const searchValue = searchInput.value.trim();
                if (searchValue) {
                    // 这里可以添加实际搜索逻辑
                    alert(`搜索: ${searchValue}`);
                }
            }
        });
    }
    
    // 分页按钮点击事件
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(number => {
        number.addEventListener('click', function() {
            pageNumbers.forEach(num => num.classList.remove('active'));
            this.classList.add('active');
            // 这里可以添加实际翻页逻辑
        });
    });
    
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            // 这里可以添加上一页逻辑
            alert('上一页功能将在未来版本实现');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // 这里可以添加下一页逻辑
            alert('下一页功能将在未来版本实现');
        });
    }
}

/**
 * 加载任务管理页面内容
 */
function loadTaskPage() {
    const page = document.getElementById('task-page');
    
    page.innerHTML = `
        <div class="task-management">
            <div class="task-management-header">
                <div class="task-management-title">任务管理</div>
                <button class="add-task-button" onclick="openAddTaskModal()">
                    <span class="icon">+</span> 添加任务
                </button>
            </div>
            
            <div class="task-filters">
                <div class="filter-group">
                    <label class="form-label">任务类型</label>
                    <select class="form-select" id="task-type-filter">
                        <option value="all">全部类型</option>
                        <option value="risk">风控任务</option>
                        <option value="marketing">营销任务</option>
                        <option value="approval">审批任务</option>
                        <option value="visit">客户拜访</option>
                        <option value="compliance">合规任务</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label class="form-label">任务状态</label>
                    <select class="form-select" id="task-status-filter">
                        <option value="all">全部状态</option>
                        <option value="not-started">未开始</option>
                        <option value="in-progress">进行中</option>
                        <option value="pending">待处理</option>
                        <option value="completed">已完成</option>
                        <option value="overdue">已逾期</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label class="form-label">负责人</label>
                    <select class="form-select" id="task-manager-filter">
                        <option value="all">全部</option>
                        <option value="li">李客户经理</option>
                        <option value="wang">王客户经理</option>
                        <option value="zhao">赵客户经理</option>
                    </select>
                </div>
                <div class="filter-buttons">
                    <button class="filter-reset" id="reset-task-filter">重置</button>
                    <button class="filter-apply" id="apply-task-filter">筛选</button>
                </div>
            </div>
            
            <!-- 任务视图切换 -->
            <div class="task-view-toggle">
                <button class="view-toggle-btn active" data-view="list">列表视图</button>
                <button class="view-toggle-btn" data-view="card">卡片视图</button>
            </div>
            
            <!-- 列表视图 -->
            <div class="task-list-view">
                <!-- 高优先级任务 -->
                <div class="task-list-item high">
                    <div class="task-list-content">
                        <div class="task-list-info">
                            <div class="task-list-title">客户信用评估</div>
                            <div class="task-list-meta">
                                <span>风控任务</span>
                                <span>杭州XX科技有限公司</span>
                                <span>李客户经理</span>
                                <span>截止: 2023-06-15 14:30</span>
                                <span><span class="task-status-label in-progress">进行中</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="task-list-actions">
                        <button class="task-list-action-btn" onclick="openTaskDetailModal('1')" title="查看详情">👁️</button>
                        <button class="task-list-action-btn" title="编辑任务">✏️</button>
                    </div>
                </div>
                
                <!-- 中优先级任务 -->
                <div class="task-list-item medium">
                    <div class="task-list-content">
                        <div class="task-list-info">
                            <div class="task-list-title">贷款审批</div>
                            <div class="task-list-meta">
                                <span>审批任务</span>
                                <span>宁波YY贸易有限公司</span>
                                <span>王客户经理</span>
                                <span>截止: 2023-06-16 10:00</span>
                                <span><span class="task-status-label pending">待处理</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="task-list-actions">
                        <button class="task-list-action-btn" onclick="openTaskDetailModal('2')" title="查看详情">👁️</button>
                        <button class="task-list-action-btn" title="编辑任务">✏️</button>
                    </div>
                </div>
                
                <!-- 低优先级任务 -->
                <div class="task-list-item low">
                    <div class="task-list-content">
                        <div class="task-list-info">
                            <div class="task-list-title">客户回访</div>
                            <div class="task-list-meta">
                                <span>营销任务</span>
                                <span>温州ZZ制造有限公司</span>
                                <span>赵客户经理</span>
                                <span>截止: 2023-06-20 15:30</span>
                                <span><span class="task-status-label not-started">未开始</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="task-list-actions">
                        <button class="task-list-action-btn" onclick="openTaskDetailModal('3')" title="查看详情">👁️</button>
                        <button class="task-list-action-btn" title="编辑任务">✏️</button>
                    </div>
                </div>
                
                <!-- 高优先级任务 -->
                <div class="task-list-item high">
                    <div class="task-list-content">
                        <div class="task-list-info">
                            <div class="task-list-title">风险客户回访</div>
                            <div class="task-list-meta">
                                <span>风控任务</span>
                                <span>杭州AA电子商务有限公司</span>
                                <span>李客户经理</span>
                                <span>截止: 2023-06-18 16:00</span>
                                <span><span class="task-status-label overdue">已逾期</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="task-list-actions">
                        <button class="task-list-action-btn" onclick="openTaskDetailModal('4')" title="查看详情">👁️</button>
                        <button class="task-list-action-btn" title="编辑任务">✏️</button>
                    </div>
                </div>
            </div>
            
            <!-- 卡片视图（默认隐藏） -->
            <div class="task-card-view" style="display: none;">
                <!-- 高优先级任务卡片 -->
                <div class="task-card high">
                    <div class="task-card-header">
                        <h3 class="task-card-title">客户信用评估</h3>
                        <span class="task-card-status in-progress">进行中</span>
                    </div>
                    <div class="task-card-content">
                        <div class="task-card-meta">
                            <span>📌 风控任务</span>
                            <span>🏢 杭州XX科技有限公司</span>
                            <span>👤 李客户经理</span>
                            <span>⏰ 截止: 2023-06-15 14:30</span>
                        </div>
                    </div>
                    <div class="task-card-footer">
                        <span>优先级: 高</span>
                        <div class="task-card-actions">
                            <button class="task-card-action-btn" onclick="openTaskDetailModal('1')" title="查看详情">👁️</button>
                            <button class="task-card-action-btn" title="编辑任务">✏️</button>
                        </div>
                    </div>
                </div>
                
                <!-- 中优先级任务卡片 -->
                <div class="task-card medium">
                    <div class="task-card-header">
                        <h3 class="task-card-title">贷款审批</h3>
                        <span class="task-card-status pending">待处理</span>
                    </div>
                    <div class="task-card-content">
                        <div class="task-card-meta">
                            <span>📌 审批任务</span>
                            <span>🏢 宁波YY贸易有限公司</span>
                            <span>👤 王客户经理</span>
                            <span>⏰ 截止: 2023-06-16 10:00</span>
                        </div>
                    </div>
                    <div class="task-card-footer">
                        <span>优先级: 中</span>
                        <div class="task-card-actions">
                            <button class="task-card-action-btn" onclick="openTaskDetailModal('2')" title="查看详情">👁️</button>
                            <button class="task-card-action-btn" title="编辑任务">✏️</button>
                        </div>
                    </div>
                </div>
                
                <!-- 低优先级任务卡片 -->
                <div class="task-card low">
                    <div class="task-card-header">
                        <h3 class="task-card-title">客户回访</h3>
                        <span class="task-card-status not-started">未开始</span>
                    </div>
                    <div class="task-card-content">
                        <div class="task-card-meta">
                            <span>📌 营销任务</span>
                            <span>🏢 温州ZZ制造有限公司</span>
                            <span>👤 赵客户经理</span>
                            <span>⏰ 截止: 2023-06-20 15:30</span>
                        </div>
                    </div>
                    <div class="task-card-footer">
                        <span>优先级: 低</span>
                        <div class="task-card-actions">
                            <button class="task-card-action-btn" onclick="openTaskDetailModal('3')" title="查看详情">👁️</button>
                            <button class="task-card-action-btn" title="编辑任务">✏️</button>
                        </div>
                    </div>
                </div>
                
                <!-- 高优先级任务卡片 -->
                <div class="task-card high">
                    <div class="task-card-header">
                        <h3 class="task-card-title">风险客户回访</h3>
                        <span class="task-card-status overdue">已逾期</span>
                    </div>
                    <div class="task-card-content">
                        <div class="task-card-meta">
                            <span>📌 风控任务</span>
                            <span>🏢 杭州AA电子商务有限公司</span>
                            <span>👤 李客户经理</span>
                            <span>⏰ 截止: 2023-06-18 16:00</span>
                        </div>
                    </div>
                    <div class="task-card-footer">
                        <span>优先级: 高</span>
                        <div class="task-card-actions">
                            <button class="task-card-action-btn" onclick="openTaskDetailModal('4')" title="查看详情">👁️</button>
                            <button class="task-card-action-btn" title="编辑任务">✏️</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 初始化视图切换功能
    initTaskViewToggle();
}

/**
 * 初始化任务视图切换功能
 */
function initTaskViewToggle() {
    const viewButtons = document.querySelectorAll('.view-toggle-btn');
    const listView = document.querySelector('.task-list-view');
    const cardView = document.querySelector('.task-card-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的激活状态
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的激活状态
            this.classList.add('active');
            
            // 根据数据属性切换视图
            const viewType = this.getAttribute('data-view');
            
            if (viewType === 'list') {
                listView.style.display = 'flex';
                cardView.style.display = 'none';
            } else if (viewType === 'card') {
                listView.style.display = 'none';
                cardView.style.display = 'grid';
            }
        });
    });
}

/**
 * 绑定任务筛选事件
 */
function bindTaskFilterEvents() {
    const resetBtn = document.getElementById('reset-task-filter');
    const applyBtn = document.getElementById('apply-task-filter');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // 重置所有筛选器
            document.getElementById('task-type-filter').value = 'all';
            document.getElementById('task-status-filter').value = 'all';
            document.getElementById('task-manager-filter').value = 'all';
        });
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            // 获取筛选值
            const taskType = document.getElementById('task-type-filter').value;
            const taskStatus = document.getElementById('task-status-filter').value;
            const taskManager = document.getElementById('task-manager-filter').value;
            
            // 简单的提示，在实际应用中应该请求后端数据
            alert(`已筛选:\n任务类型: ${taskType}\n任务状态: ${taskStatus}\n负责人: ${taskManager}`);
        });
    }
}

/**
 * 加载日程管理页面内容
 */
function loadSchedulePage() {
    const page = document.getElementById('schedule-page');
    
    page.innerHTML = `
        <div class="schedule-management">
            <div class="calendar-header">
                <div class="month-navigation">
                    <button class="nav-button prev-month">◀</button>
                    <h2>2023年6月</h2>
                    <button class="nav-button next-month">▶</button>
                </div>
                <div class="view-options">
                    <button class="view-button active">月视图</button>
                    <button class="view-button">周视图</button>
                    <button class="view-button">日视图</button>
                    <button class="add-schedule-button">+ 添加日程</button>
                </div>
            </div>
            
            <div class="calendar-container">
                <div class="calendar-weekdays">
                    <div class="weekday">周日</div>
                    <div class="weekday">周一</div>
                    <div class="weekday">周二</div>
                    <div class="weekday">周三</div>
                    <div class="weekday">周四</div>
                    <div class="weekday">周五</div>
                    <div class="weekday">周六</div>
                </div>
                
                <div class="calendar-days">
                    <div class="day other-month">28</div>
                    <div class="day other-month">29</div>
                    <div class="day other-month">30</div>
                    <div class="day other-month">31</div>
                    <div class="day">1</div>
                    <div class="day">2</div>
                    <div class="day">3</div>
                    <div class="day">4</div>
                    <div class="day">5</div>
                    <div class="day">6</div>
                    <div class="day">7</div>
                    <div class="day">8</div>
                    <div class="day">9</div>
                    <div class="day">10</div>
                    <div class="day">11</div>
                    <div class="day">12</div>
                    <div class="day">13</div>
                    <div class="day">14</div>
                    <div class="day current-day">15
                        <div class="event-indicator">
                            <div class="event high" onclick="openEventDetailModal('1')">客户信用评估 14:30</div>
                            <div class="event medium" onclick="openEventDetailModal('2')">风险客户回访 16:00</div>
                        </div>
                    </div>
                    <div class="day">16
                        <div class="event-indicator">
                            <div class="event medium" onclick="openEventDetailModal('3')">贷款审批 10:00</div>
                        </div>
                    </div>
                    <div class="day">17</div>
                    <div class="day">18
                        <div class="event-indicator">
                            <div class="event high" onclick="openEventDetailModal('4')">合同签署 09:30</div>
                        </div>
                    </div>
                    <div class="day">19</div>
                    <div class="day">20
                        <div class="event-indicator">
                            <div class="event low" onclick="openEventDetailModal('5')">客户回访 15:30</div>
                        </div>
                    </div>
                    <div class="day">21</div>
                    <div class="day">22</div>
                    <div class="day">23</div>
                    <div class="day">24</div>
                    <div class="day">25</div>
                    <div class="day">26</div>
                    <div class="day">27</div>
                    <div class="day">28</div>
                    <div class="day">29</div>
                    <div class="day">30</div>
                    <div class="day other-month">1</div>
                    <div class="day other-month">2</div>
                    <div class="day other-month">3</div>
                    <div class="day other-month">4</div>
                    <div class="day other-month">5</div>
                    <div class="day other-month">6</div>
                    <div class="day other-month">7</div>
                    <div class="day other-month">8</div>
                </div>
            </div>
            
            <div class="schedule-events">
                <h3>今日日程</h3>
                <div class="event-list">
                    <div class="event-item" onclick="openEventDetailModal('1')">
                        <div class="event-time">14:30</div>
                        <div class="event-content">
                            <div class="event-title">客户信用评估</div>
                            <div class="event-details">杭州XX科技有限公司 - 李客户经理</div>
                        </div>
                        <div class="event-priority high"></div>
                        <div class="event-actions">
                            <div class="event-action edit-action" onclick="event.stopPropagation(); openEditEventModal('1')">✏️</div>
                            <div class="event-action delete-action" onclick="event.stopPropagation(); confirmDeleteEvent('1')">🗑️</div>
                        </div>
                    </div>
                    <div class="event-item" onclick="openEventDetailModal('2')">
                        <div class="event-time">16:00</div>
                        <div class="event-content">
                            <div class="event-title">风险客户回访</div>
                            <div class="event-details">杭州AA电子商务有限公司 - 李客户经理</div>
                        </div>
                        <div class="event-priority medium"></div>
                        <div class="event-actions">
                            <div class="event-action edit-action" onclick="event.stopPropagation(); openEditEventModal('2')">✏️</div>
                            <div class="event-action delete-action" onclick="event.stopPropagation(); confirmDeleteEvent('2')">🗑️</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    
    // 绑定事件
    bindScheduleEvents();
}

/**
 * 绑定日程管理页面的事件
 */
function bindScheduleEvents() {
    // 月份导航按钮事件
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            // 切换到上个月
            alert('切换到上个月的功能将在未来版本实现');
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            // 切换到下个月
            alert('切换到下个月的功能将在未来版本实现');
        });
    }
    
    // 视图按钮事件
    const viewButtons = document.querySelectorAll('.view-button');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加active类
            button.classList.add('active');
            
            // 切换视图逻辑将在未来版本实现
            if (button.textContent !== '月视图') {
                alert(`${button.textContent}功能将在未来版本实现`);
            }
        });
    });
    
    // 添加日程按钮事件
    const addScheduleButton = document.querySelector('.add-schedule-button');
    
    if (addScheduleButton) {
        addScheduleButton.addEventListener('click', () => {
            openAddEventModal();
        });
    }
    
    // 日期点击事件
    const days = document.querySelectorAll('.day');
    
    days.forEach(day => {
        day.addEventListener('click', (e) => {
            // 仅当点击的是日期区域而不是事件时才触发
            if (e.target === day) {
                const dayNum = day.textContent.trim().split('\n')[0];
                if (!day.classList.contains('other-month')) {
                    openAddEventModal(`2023-06-${dayNum.padStart(2, '0')}`);
                }
            }
        });
    });
    
    // 今日日程标题中的"添加日程"点击事件
    const todayEventsTitle = document.querySelector('.schedule-events h3');
    
    if (todayEventsTitle) {
        todayEventsTitle.addEventListener('click', (e) => {
            // 检查点击的是否是伪元素区域
            const rect = todayEventsTitle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            // 如果点击的是右侧区域（伪元素位置），则打开添加日程模态框
            if (x > rect.width / 2) {
                openAddEventModal();
            }
        });
    }
    
    // 为事件项目设置对应的边框颜色
    const eventItems = document.querySelectorAll('.event-item');
    
    eventItems.forEach(item => {
        const priority = item.querySelector('.event-priority');
        if (priority) {
            if (priority.classList.contains('high')) {
                item.style.borderLeft = '4px solid var(--danger-color)';
            } else if (priority.classList.contains('medium')) {
                item.style.borderLeft = '4px solid var(--orange-color)';
            } else if (priority.classList.contains('low')) {
                item.style.borderLeft = '4px solid var(--success-color)';
            }
        }
    });
}

/**
 * 打开添加日程模态框
 * @param {string} date 可选的日期字符串，格式为YYYY-MM-DD
 */
function openAddEventModal(date) {
    // 打开添加日程的模态框
    const modal = document.getElementById('eventModal');
    const modalContent = modal.querySelector('.modal-content');
    
    if (!modal.classList.contains('active')) {
        modal.classList.add('active');
    }
    
    const dateStr = date || '2023-06-15';
    const formattedDate = dateStr.split('-')[2] + '日';
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>添加日程 - 6月${formattedDate}</h2>
            <span class="close-modal">&times;</span>
        </div>
        <div class="modal-body">
            <form id="eventForm">
                <div class="form-group">
                    <label class="form-label">日程标题</label>
                    <input type="text" class="form-input" placeholder="请输入日程标题">
                </div>
                <div class="form-group">
                    <label class="form-label">时间</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="time" class="form-input" value="09:00">
                        <span style="align-self: center;">至</span>
                        <input type="time" class="form-input" value="10:00">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">关联客户</label>
                    <select class="form-select">
                        <option value="">请选择客户</option>
                        <option value="1">杭州XX科技有限公司</option>
                        <option value="2">宁波YY贸易有限公司</option>
                        <option value="3">温州ZZ制造有限公司</option>
                        <option value="4">杭州AA电子商务有限公司</option>
                        <option value="5">台州BB物流有限公司</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">优先级</label>
                    <div style="display: flex; gap: 15px;">
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="priority" value="low"> 
                            <span class="task-priority low" style="margin-right: 5px;"></span>低
                        </label>
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="priority" value="medium" checked> 
                            <span class="task-priority medium" style="margin-right: 5px;"></span>中
                        </label>
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="priority" value="high"> 
                            <span class="task-priority high" style="margin-right: 5px;"></span>高
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">备注</label>
                    <textarea class="form-textarea" placeholder="请输入日程备注信息"></textarea>
                </div>
                
                <div class="form-buttons">
                    <button type="button" class="cancel-button" onclick="closeModal('eventModal')">取消</button>
                    <button type="button" class="submit-button" onclick="saveEvent()">保存</button>
                </div>
            </form>
        </div>
    `;
    
    // 绑定关闭模态框事件
    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        closeModal('eventModal');
    });
}

/**
 * 打开日程详情模态框
 * @param {string} eventId 日程ID
 */
function openEventDetailModal(eventId) {
    // 防止冒泡
    event.stopPropagation();

    // 打开日程详情模态框
    const modal = document.getElementById('eventDetailModal');
    const modalContent = modal.querySelector('.modal-content');
    
    if (!modal.classList.contains('active')) {
        modal.classList.add('active');
    }
    
    // 示例数据
    let eventData = {
        id: eventId,
        title: '客户信用评估',
        date: '2023-06-15',
        startTime: '14:30',
        endTime: '16:00',
        customer: '杭州XX科技有限公司',
        manager: '李客户经理',
        priority: 'high',
        notes: '这是一个重要的客户评估会议，需要准备相关材料并提前联系客户确认时间。',
        status: '未开始'
    };
    
    // 根据ID获取不同的示例数据
    if (eventId === '2') {
        eventData = {
            id: eventId,
            title: '风险客户回访',
            date: '2023-06-15',
            startTime: '16:00',
            endTime: '17:30',
            customer: '杭州AA电子商务有限公司',
            manager: '李客户经理',
            priority: 'medium',
            notes: '该客户近期出现逾期风险，需要进行回访沟通，了解客户经营状况。',
            status: '未开始'
        };
    } else if (eventId === '3') {
        eventData = {
            id: eventId,
            title: '贷款审批',
            date: '2023-06-16',
            startTime: '10:00',
            endTime: '11:30',
            customer: '宁波YY贸易有限公司',
            manager: '王客户经理',
            priority: 'medium',
            notes: '该客户提交的贷款申请需要审核评估。',
            status: '未开始'
        };
    } else if (eventId === '4') {
        eventData = {
            id: eventId,
            title: '合同签署',
            date: '2023-06-18',
            startTime: '09:30',
            endTime: '11:00',
            customer: '台州BB物流有限公司',
            manager: '王客户经理',
            priority: 'high',
            notes: '与客户进行贷款合同签署，需要准备相关材料。',
            status: '未开始'
        };
    } else if (eventId === '5') {
        eventData = {
            id: eventId,
            title: '客户回访',
            date: '2023-06-20',
            startTime: '15:30',
            endTime: '16:30',
            customer: '温州ZZ制造有限公司',
            manager: '赵客户经理',
            priority: 'low',
            notes: '常规客户回访，了解客户近期经营情况。',
            status: '未开始'
        };
    }
    
    // 根据优先级显示不同的标签样式
    let priorityText = '低';
    let priorityClass = 'low';
    
    if (eventData.priority === 'medium') {
        priorityText = '中';
        priorityClass = 'medium';
    } else if (eventData.priority === 'high') {
        priorityText = '高';
        priorityClass = 'high';
    }
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>日程详情</h2>
            <span class="close-modal">&times;</span>
        </div>
        <div class="modal-body">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <h3 style="font-size: 18px; margin: 0;">${eventData.title}</h3>
                <span class="task-priority ${priorityClass}">${priorityText}</span>
            </div>
            
            <div class="info-table-container">
                <table class="info-table">
                    <tr>
                        <th width="120">日期时间</th>
                        <td>${eventData.date} ${eventData.startTime} - ${eventData.endTime}</td>
                    </tr>
                    <tr>
                        <th>关联客户</th>
                        <td>${eventData.customer}</td>
                    </tr>
                    <tr>
                        <th>负责人</th>
                        <td>${eventData.manager}</td>
                    </tr>
                    <tr>
                        <th>状态</th>
                        <td>${eventData.status}</td>
                    </tr>
                    <tr>
                        <th>备注</th>
                        <td>${eventData.notes || '无'}</td>
                    </tr>
                </table>
            </div>
            
            <div class="form-buttons">
                <button type="button" class="cancel-button" onclick="closeModal('eventDetailModal')">关闭</button>
                <button type="button" class="edit-button submit-button" onclick="openEditEventModal('${eventData.id}')">编辑</button>
            </div>
        </div>
    `;
    
    // 绑定关闭模态框事件
    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        closeModal('eventDetailModal');
    });
}

/**
 * 打开编辑日程模态框
 * @param {string} eventId 日程ID
 */
function openEditEventModal(eventId) {
    // 防止冒泡
    if (event) {
        event.stopPropagation();
    }
    
    // 关闭可能打开的详情模态框
    closeModal('eventDetailModal');
    
    // 打开编辑日程模态框
    const modal = document.getElementById('eventModal');
    const modalContent = modal.querySelector('.modal-content');
    
    if (!modal.classList.contains('active')) {
        modal.classList.add('active');
    }
    
    // 示例数据，实际应用中应该从服务器获取
    let eventData = {
        id: eventId,
        title: '客户信用评估',
        date: '2023-06-15',
        startTime: '14:30',
        endTime: '16:00',
        customerId: '1',
        customer: '杭州XX科技有限公司',
        priority: 'high',
        notes: '这是一个重要的客户评估会议，需要准备相关材料并提前联系客户确认时间。'
    };
    
    // 根据ID获取不同的示例数据
    if (eventId === '2') {
        eventData = {
            id: eventId,
            title: '风险客户回访',
            date: '2023-06-15',
            startTime: '16:00',
            endTime: '17:30',
            customerId: '4',
            customer: '杭州AA电子商务有限公司',
            priority: 'medium',
            notes: '该客户近期出现逾期风险，需要进行回访沟通，了解客户经营状况。'
        };
    } else if (eventId === '3') {
        eventData = {
            id: eventId,
            title: '贷款审批',
            date: '2023-06-16',
            startTime: '10:00',
            endTime: '11:30',
            customerId: '2',
            customer: '宁波YY贸易有限公司',
            priority: 'medium',
            notes: '该客户提交的贷款申请需要审核评估。'
        };
    }
    
    const formattedDate = eventData.date.split('-')[2] + '日';
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>编辑日程 - 6月${formattedDate}</h2>
            <span class="close-modal">&times;</span>
        </div>
        <div class="modal-body">
            <form id="eventForm">
                <input type="hidden" id="eventId" value="${eventData.id}">
                <div class="form-group">
                    <label class="form-label">日程标题</label>
                    <input type="text" class="form-input" value="${eventData.title}" placeholder="请输入日程标题">
                </div>
                <div class="form-group">
                    <label class="form-label">时间</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="time" class="form-input" value="${eventData.startTime}">
                        <span style="align-self: center;">至</span>
                        <input type="time" class="form-input" value="${eventData.endTime}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">关联客户</label>
                    <select class="form-select">
                        <option value="">请选择客户</option>
                        <option value="1" ${eventData.customerId === '1' ? 'selected' : ''}>杭州XX科技有限公司</option>
                        <option value="2" ${eventData.customerId === '2' ? 'selected' : ''}>宁波YY贸易有限公司</option>
                        <option value="3" ${eventData.customerId === '3' ? 'selected' : ''}>温州ZZ制造有限公司</option>
                        <option value="4" ${eventData.customerId === '4' ? 'selected' : ''}>杭州AA电子商务有限公司</option>
                        <option value="5" ${eventData.customerId === '5' ? 'selected' : ''}>台州BB物流有限公司</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">优先级</label>
                    <div style="display: flex; gap: 15px;">
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="priority" value="low" ${eventData.priority === 'low' ? 'checked' : ''}> 
                            <span class="task-priority low" style="margin-right: 5px;"></span>低
                        </label>
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="priority" value="medium" ${eventData.priority === 'medium' ? 'checked' : ''}> 
                            <span class="task-priority medium" style="margin-right: 5px;"></span>中
                        </label>
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="priority" value="high" ${eventData.priority === 'high' ? 'checked' : ''}> 
                            <span class="task-priority high" style="margin-right: 5px;"></span>高
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">备注</label>
                    <textarea class="form-textarea" placeholder="请输入日程备注信息">${eventData.notes || ''}</textarea>
                </div>
                
                <div class="form-buttons">
                    <button type="button" class="cancel-button" onclick="closeModal('eventModal')">取消</button>
                    <button type="button" class="submit-button" onclick="updateEvent('${eventData.id}')">保存</button>
                </div>
            </form>
        </div>
    `;
    
    // 绑定关闭模态框事件
    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        closeModal('eventModal');
    });
}

/**
 * 确认删除日程
 * @param {string} eventId 日程ID
 */
function confirmDeleteEvent(eventId) {
    if (confirm('确定要删除这个日程吗？')) {
        alert('日程已删除（实际删除功能将在未来版本实现）');
    }
}

/**
 * 保存新日程
 */
function saveEvent() {
    alert('日程已保存（实际保存功能将在未来版本实现）');
    closeModal('eventModal');
}

/**
 * 更新日程
 * @param {string} eventId 日程ID
 */
function updateEvent(eventId) {
    alert(`日程ID: ${eventId} 已更新（实际更新功能将在未来版本实现）`);
    closeModal('eventModal');
}

/**
 * 加载数据报表页面内容
 */
function loadReportPage() {
    const page = document.getElementById('report-page');
    
    page.innerHTML = `
        <div class="report-management">
            <div class="report-header">
                <h2>数据报表</h2>
                <div class="report-filters">
                    <div class="filter-group">
                        <label>报表类型</label>
                        <select class="form-select" id="report-type-filter">
                            <option value="business">业务报表</option>
                            <option value="risk">风控报表</option>
                            <option value="finance">财务报表</option>
                            <option value="customer">客户报表</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>日期范围</label>
                        <select class="form-select" id="report-date-filter">
                            <option value="day">今日</option>
                            <option value="week">本周</option>
                            <option value="month" selected>本月</option>
                            <option value="quarter">本季度</option>
                            <option value="year">本年</option>
                            <option value="custom">自定义</option>
                        </select>
                    </div>
                    <button class="search-button" id="generate-report-btn">生成报表</button>
                </div>
            </div>
            
            <div class="report-content">
                <div class="report-section">
                    <h3>业务概览</h3>
                    <div class="dashboard-stats">
                        <div class="stat-item">
                            <div class="stat-value">¥ 2,356,789</div>
                            <div class="stat-label">本月贷款发放总额</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">¥ 1,975,432</div>
                            <div class="stat-label">本月贷款回收总额</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">356</div>
                            <div class="stat-label">本月新增客户数</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">96.8%</div>
                            <div class="stat-label">本月还款率</div>
                        </div>
                    </div>
                </div>
                
                <div class="report-row">
                    <div class="report-section chart-section">
                        <h3>贷款发放趋势</h3>
                        <div class="chart-container" id="report-loan-chart">
                            <canvas id="reportLoanChart"></canvas>
                        </div>
                    </div>
                    <div class="report-section chart-section">
                        <h3>客户分布</h3>
                        <div class="chart-container" id="report-customer-chart">
                            <canvas id="reportCustomerChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="report-section">
                    <h3>贷款产品明细</h3>
                    <table class="info-table">
                        <thead>
                            <tr>
                                <th>产品名称</th>
                                <th>发放笔数</th>
                                <th>发放金额(万元)</th>
                                <th>平均金额(万元)</th>
                                <th>平均期限(月)</th>
                                <th>平均利率(%)</th>
                                <th>同比增长(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>个人消费贷款</td>
                                <td>245</td>
                                <td>735</td>
                                <td>3.0</td>
                                <td>12</td>
                                <td>6.5</td>
                                <td class="positive-change">+12.5</td>
                            </tr>
                            <tr>
                                <td>小微企业贷款</td>
                                <td>132</td>
                                <td>1320</td>
                                <td>10.0</td>
                                <td>24</td>
                                <td>7.2</td>
                                <td class="positive-change">+8.3</td>
                            </tr>
                            <tr>
                                <td>固定资产抵押贷款</td>
                                <td>45</td>
                                <td>900</td>
                                <td>20.0</td>
                                <td>36</td>
                                <td>5.8</td>
                                <td class="negative-change">-2.1</td>
                            </tr>
                            <tr>
                                <td>信用贷款</td>
                                <td>78</td>
                                <td>312</td>
                                <td>4.0</td>
                                <td>18</td>
                                <td>8.5</td>
                                <td class="positive-change">+15.2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="report-row">
                    <div class="report-section chart-section">
                        <h3>贷款产品分布</h3>
                        <div class="chart-container" id="report-product-chart">
                            <canvas id="reportProductChart"></canvas>
                        </div>
                    </div>
                    <div class="report-section chart-section">
                        <h3>客户评级分布</h3>
                        <div class="chart-container" id="report-rating-chart">
                            <canvas id="reportRatingChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="report-download">
                    <button class="download-button">
                        <span>导出Excel</span>
                    </button>
                    <button class="download-button">
                        <span>导出PDF</span>
                    </button>
                    <button class="download-button">
                        <span>打印报表</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 绑定报表页面事件
    bindReportEvents();
    
    // 初始化报表图表
    initReportCharts();
}

/**
 * 绑定报表页面的事件
 */
function bindReportEvents() {
    const generateBtn = document.getElementById('generate-report-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const reportType = document.getElementById('report-type-filter').value;
            const dateRange = document.getElementById('report-date-filter').value;
            
            // 显示加载中状态
            this.textContent = '加载中...';
            this.disabled = true;
            this.style.opacity = '0.7';
            this.style.cursor = 'not-allowed';
            
            // 添加加载动画效果
            const reportContent = document.querySelector('.report-content');
            if (reportContent) {
                reportContent.style.opacity = '0.6';
                reportContent.style.pointerEvents = 'none';
            }
            
            // 模拟数据加载延迟
            setTimeout(() => {
                // 重新初始化图表（实际应用中应该请求新数据）
                initReportCharts();
                
                // 恢复按钮状态
                this.textContent = '生成报表';
                this.disabled = false;
                this.style.opacity = '';
                this.style.cursor = '';
                
                // 恢复内容区域状态
                if (reportContent) {
                    reportContent.style.opacity = '';
                    reportContent.style.pointerEvents = '';
                }
                
                // 更新生成时间
                const timestamp = document.createElement('div');
                timestamp.className = 'report-timestamp';
                timestamp.textContent = `数据更新时间: ${formatDate(new Date())}`;
                
                // 添加到报表头部
                const reportHeader = document.querySelector('.report-header');
                const existingTimestamp = document.querySelector('.report-timestamp');
                if (existingTimestamp) {
                    existingTimestamp.textContent = timestamp.textContent;
                } else if (reportHeader) {
                    reportHeader.appendChild(timestamp);
                }
                
                // 显示成功消息和动画效果
                const successMsg = document.createElement('div');
                successMsg.className = 'report-success-msg';
                successMsg.textContent = `${getReportTypeLabel(reportType)}生成成功!`;
                document.body.appendChild(successMsg);
                
                // 短暂显示后淡出
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(successMsg);
                    }, 500);
                }, 2000);
            }, 800);
        });
    }
    
    // 绑定下载按钮点击事件
    const downloadButtons = document.querySelectorAll('.report-download .download-button');
    downloadButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const actions = ['导出Excel', '导出PDF', '打印报表'];
            alert(`${actions[index]}功能将在未来版本实现`);
        });
    });
    
    // 表格排序功能
    initTableSorting();
    
    // 表格行高亮效果
    initTableRowHighlight();
}

/**
 * 格式化日期为 YYYY-MM-DD HH:MM:SS 格式
 * @param {Date} date 日期对象
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 初始化表格排序功能
 */
function initTableSorting() {
    const tables = document.querySelectorAll('.report-section .info-table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('thead th');
        headers.forEach((header, index) => {
            // 跳过第一列（产品名称）不添加排序
            if (index === 0) return;
            
            header.style.cursor = 'pointer';
            header.title = '点击排序';
            
            // 添加排序指示器
            const sortIndicator = document.createElement('span');
            sortIndicator.className = 'sort-indicator';
            sortIndicator.textContent = ' ↕';
            sortIndicator.style.opacity = '0.4';
            sortIndicator.style.fontSize = '12px';
            header.appendChild(sortIndicator);
            
            // 添加排序事件
            header.addEventListener('click', () => {
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                // 移除其他列的排序状态
                headers.forEach(h => {
                    if (h !== header) {
                        const ind = h.querySelector('.sort-indicator');
                        if (ind) {
                            ind.textContent = ' ↕';
                            ind.style.opacity = '0.4';
                        }
                    }
                });
                
                // 获取当前排序方向
                const currentSort = header.getAttribute('data-sort') || 'none';
                let nextSort;
                
                if (currentSort === 'none' || currentSort === 'desc') {
                    nextSort = 'asc';
                    sortIndicator.textContent = ' ↑';
                    sortIndicator.style.opacity = '1';
                } else {
                    nextSort = 'desc';
                    sortIndicator.textContent = ' ↓';
                    sortIndicator.style.opacity = '1';
                }
                
                // 设置新的排序方向
                header.setAttribute('data-sort', nextSort);
                
                // 排序行
                rows.sort((a, b) => {
                    // 获取单元格文本
                    let aValue = a.cells[index].textContent;
                    let bValue = b.cells[index].textContent;
                    
                    // 检查是否为数字
                    if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                        aValue = parseFloat(aValue.replace(/[^\d.-]/g, ''));
                        bValue = parseFloat(bValue.replace(/[^\d.-]/g, ''));
                    }
                    
                    // 根据排序方向比较
                    if (nextSort === 'asc') {
                        return aValue > bValue ? 1 : -1;
                    } else {
                        return aValue < bValue ? 1 : -1;
                    }
                });
                
                // 重新添加排序后的行
                rows.forEach(row => tbody.appendChild(row));
                
                // 添加排序后的高亮动画
                rows.forEach(row => {
                    row.style.animation = 'highlightRow 1s';
                    setTimeout(() => {
                        row.style.animation = '';
                    }, 1000);
                });
            });
        });
    });
}

/**
 * 初始化表格行的高亮效果
 */
function initTableRowHighlight() {
    const tables = document.querySelectorAll('.report-section .info-table');
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseover', () => {
                row.style.backgroundColor = 'rgba(101, 62, 179, 0.05)';
                row.style.transition = 'background-color 0.2s';
            });
            
            row.addEventListener('mouseout', () => {
                row.style.backgroundColor = '';
            });
        });
    });
}

/**
 * 获取报表类型的中文标签
 * @param {string} type 报表类型值
 * @returns {string} 报表类型的中文标签
 */
function getReportTypeLabel(type) {
    const labels = {
        'business': '业务报表',
        'risk': '风控报表',
        'finance': '财务报表',
        'customer': '客户报表'
    };
    return labels[type] || '报表';
}

/**
 * 获取日期范围的中文标签
 * @param {string} range 日期范围值
 * @returns {string} 日期范围的中文标签
 */
function getDateRangeLabel(range) {
    const labels = {
        'day': '今日',
        'week': '本周',
        'month': '本月',
        'quarter': '本季度',
        'year': '本年',
        'custom': '自定义日期'
    };
    return labels[range] || '全部日期';
}

/**
 * 初始化数据报表页面的图表
 */
function initReportCharts() {
    // 初始化贷款发放趋势图
    initLoanTrendChart();
    
    // 初始化客户分布图
    initCustomerDistributionChart();
    
    // 初始化贷款产品分布图
    initProductDistributionChart();
    
    // 初始化客户评级分布图
    initRatingDistributionChart();
}

/**
 * 初始化贷款发放趋势图
 */
function initLoanTrendChart() {
    const ctx = document.getElementById('reportLoanChart');
    if (!ctx) return;
    
    // 清除可能存在的旧图表
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // 准备数据
    const data = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '贷款发放金额',
                data: [400, 520, 480, 670, 710, 690, 780, 720, 690, 750, 810, 720],
                borderColor: getChartBorderColor(0),
                backgroundColor: getChartColor(0),
                borderWidth: 2,
                fill: true
            },
            {
                label: '贷款回收金额',
                data: [350, 470, 430, 620, 660, 620, 700, 650, 630, 680, 750, 680],
                borderColor: getChartBorderColor(4),
                backgroundColor: getChartColor(4),
                borderWidth: 2,
                fill: true
            }
        ]
    };
    
    // 获取通用配置
    const options = {
        ...getChartSharedOptions('line'),
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '金额（万元）'
                },
                ticks: {
                    callback: function(value) {
                        return value + ' 万';
                    }
                }
            }
        },
        plugins: {
            ...getChartSharedOptions('line').plugins,
            tooltip: {
                ...getChartSharedOptions('line').plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' 万元';
                        }
                        return label;
                    }
                }
            }
        }
    };
    
    // 创建图表
    ctx.chart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: data,
        options: options
    });
}

/**
 * 初始化客户分布图
 */
function initCustomerDistributionChart() {
    const ctx = document.getElementById('reportCustomerChart');
    if (!ctx) return;
    
    // 清除可能存在的旧图表
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // 准备数据
    const data = {
        labels: ['企业客户', '个体工商户', '个人客户'],
        datasets: [{
            data: [45, 30, 25],
            backgroundColor: [
                getChartColor(0),
                getChartColor(1),
                getChartColor(2)
            ],
            borderColor: [
                getChartBorderColor(0),
                getChartBorderColor(1),
                getChartBorderColor(2)
            ],
            borderWidth: 1,
            hoverOffset: 15
        }]
    };
    
    // 获取通用配置
    const options = {
        ...getChartSharedOptions('doughnut'),
        plugins: {
            ...getChartSharedOptions('doughnut').plugins,
            tooltip: {
                ...getChartSharedOptions('doughnut').plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                        const percentage = Math.round((value * 100) / total) + '%';
                        return `${label}: ${percentage}`;
                    }
                }
            }
        }
    };
    
    // 创建图表
    ctx.chart = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: data,
        options: options
    });
}

/**
 * 初始化贷款产品分布图
 */
function initProductDistributionChart() {
    const ctx = document.getElementById('reportProductChart');
    if (!ctx) return;
    
    // 清除可能存在的旧图表
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // 准备数据
    const data = {
        labels: ['个人消费贷款', '小微企业贷款', '固定资产抵押贷款', '信用贷款'],
        datasets: [{
            data: [735, 1320, 900, 312],
            backgroundColor: [
                getChartColor(0),
                getChartColor(1),
                getChartColor(2),
                getChartColor(3)
            ],
            borderColor: [
                getChartBorderColor(0),
                getChartBorderColor(1),
                getChartBorderColor(2),
                getChartBorderColor(3)
            ],
            borderWidth: 1
        }]
    };
    
    // 获取通用配置
    const options = {
        ...getChartSharedOptions('pie'),
        plugins: {
            ...getChartSharedOptions('pie').plugins,
            tooltip: {
                ...getChartSharedOptions('pie').plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value} 万元`;
                    }
                }
            }
        }
    };
    
    // 创建图表
    ctx.chart = new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: data,
        options: options
    });
}

/**
 * 初始化客户评级分布图
 */
function initRatingDistributionChart() {
    const ctx = document.getElementById('reportRatingChart');
    if (!ctx) return;
    
    // 清除可能存在的旧图表
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // 准备数据
    const data = {
        labels: ['A级', 'B级', 'C级', 'D级', 'E级'],
        datasets: [{
            label: '客户数量',
            data: [430, 350, 250, 170, 80],
            backgroundColor: getChartColor(0),
            borderColor: getChartBorderColor(0),
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 40,
        }]
    };
    
    // 获取通用配置
    const options = {
        ...getChartSharedOptions('bar'),
        plugins: {
            ...getChartSharedOptions('bar').plugins,
            tooltip: {
                ...getChartSharedOptions('bar').plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' 位客户';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            ...getChartSharedOptions('bar').scales,
            y: {
                ...getChartSharedOptions('bar').scales.y,
                beginAtZero: true,
                title: {
                    display: true,
                    text: '客户数量'
                }
            }
        }
    };
    
    // 创建图表
    ctx.chart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: data,
        options: options
    });
}

/**
 * 加载消息中心页面内容
 */
function loadMessagePage() {
    const page = document.getElementById('message-page');
    
    page.innerHTML = `
        <div class="message-center">
            <div class="message-header">
                <h2>消息中心</h2>
                <div class="message-filters">
                    <div class="filter-group">
                        <label>消息类型</label>
                        <select class="form-select" id="message-type-filter">
                            <option value="all">全部消息</option>
                            <option value="system">系统消息</option>
                            <option value="task">任务提醒</option>
                            <option value="alert">风险提醒</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>时间范围</label>
                        <select class="form-select" id="message-time-filter">
                            <option value="today">今日</option>
                            <option value="week">近7天</option>
                            <option value="month" selected>近30天</option>
                            <option value="all">全部</option>
                        </select>
                    </div>
                    <button class="search-button" id="filter-messages-btn">筛选</button>
                </div>
            </div>
            
            <div class="message-list">
                <div class="message-item unread" data-id="1" data-type="alert">
                    <div class="message-icon alert">🔔</div>
                    <div class="message-content">
                        <div class="message-header-row">
                            <div class="message-title">贷款逾期提醒</div>
                            <div class="message-time">今日 10:30</div>
                        </div>
                        <div class="message-body">
                            杭州AA电子商务有限公司的贷款账户将在3天后逾期，请及时联系客户处理。
                        </div>
                    </div>
                </div>
                
                <div class="message-item unread" data-id="2" data-type="task">
                    <div class="message-icon task">📝</div>
                    <div class="message-content">
                        <div class="message-header-row">
                            <div class="message-title">任务截止提醒</div>
                            <div class="message-time">今日 09:15</div>
                        </div>
                        <div class="message-body">
                            您有一个"客户信用评估"任务将在今日14:30截止，请及时处理。
                        </div>
                    </div>
                </div>
                
                <div class="message-item" data-id="3" data-type="system">
                    <div class="message-icon system">ℹ️</div>
                    <div class="message-content">
                        <div class="message-header-row">
                            <div class="message-title">系统更新通知</div>
                            <div class="message-time">昨日 15:45</div>
                        </div>
                        <div class="message-body">
                            系统将于2023年6月18日凌晨2:00-4:00进行版本更新，期间系统可能无法访问，请提前做好相关工作安排。
                        </div>
                    </div>
                </div>
                
                <div class="message-item" data-id="4" data-type="alert">
                    <div class="message-icon alert">⚠️</div>
                    <div class="message-content">
                        <div class="message-header-row">
                            <div class="message-title">风险预警</div>
                            <div class="message-time">2023-06-13 11:20</div>
                        </div>
                        <div class="message-body">
                            系统检测到宁波YY贸易有限公司近期银行流水异常，请关注客户经营状况变化。
                        </div>
                    </div>
                </div>
                
                <div class="message-item" data-id="5" data-type="task">
                    <div class="message-icon task">✅</div>
                    <div class="message-content">
                        <div class="message-header-row">
                            <div class="message-title">任务完成通知</div>
                            <div class="message-time">2023-06-12 16:30</div>
                        </div>
                        <div class="message-body">
                            您分配给王客户经理的"合同审核"任务已完成。
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pagination">
                <button class="page-button prev-button">上一页</button>
                <div class="page-numbers">
                    <span class="page-number active">1</span>
                    <span class="page-number">2</span>
                    <span class="page-number">3</span>
                </div>
                <button class="page-button next-button">下一页</button>
            </div>
        </div>
    `;
    
    // 绑定消息中心事件
    bindMessageEvents();
}

/**
 * 绑定消息中心的事件
 */
function bindMessageEvents() {
    // 获取所有消息项目
    const messageItems = document.querySelectorAll('.message-item');
    
    // 为每个消息项目添加点击事件
    messageItems.forEach(item => {
        item.addEventListener('click', () => {
            const messageId = item.getAttribute('data-id');
            // 打开消息详情（此处仅做标记为已读处理）
            markMessageAsRead(item);
            // 弹出消息详情
            showMessageDetail(messageId);
        });
    });
    
    // 筛选按钮点击事件
    const filterBtn = document.getElementById('filter-messages-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', filterMessages);
    }
    
    // 分页按钮事件
    const prevButton = document.querySelector('.pagination .prev-button');
    const nextButton = document.querySelector('.pagination .next-button');
    const pageNumbers = document.querySelectorAll('.pagination .page-number');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            alert('上一页功能将在未来版本实现');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            alert('下一页功能将在未来版本实现');
        });
    }
    
    pageNumbers.forEach(number => {
        number.addEventListener('click', () => {
            // 移除所有页码的active类
            pageNumbers.forEach(num => num.classList.remove('active'));
            // 给当前点击的页码添加active类
            number.classList.add('active');
            
            // 切换页面逻辑将在未来版本实现
            if (number.textContent !== '1') {
                alert(`第${number.textContent}页功能将在未来版本实现`);
                // 恢复第一页的active状态
                pageNumbers[0].classList.add('active');
                number.classList.remove('active');
            }
        });
    });
}

/**
 * 标记消息为已读
 * @param {Element} messageItem 消息元素
 */
function markMessageAsRead(messageItem) {
    if (messageItem.classList.contains('unread')) {
        messageItem.classList.remove('unread');
        // 实际应用中应该发送请求到服务器，更新消息状态
        
        // 更新通知徽章
        updateNotificationBadge();
    }
}

/**
 * 显示消息详情
 * @param {string} messageId 消息ID
 */
function showMessageDetail(messageId) {
    // 在实际应用中，应该通过AJAX请求获取消息详情
    // 此处仅使用示例数据
    
    // 获取当前消息内容
    const messageItem = document.querySelector(`.message-item[data-id="${messageId}"]`);
    if (!messageItem) return;
    
    const title = messageItem.querySelector('.message-title').textContent;
    const time = messageItem.querySelector('.message-time').textContent;
    const body = messageItem.querySelector('.message-body').textContent;
    const type = messageItem.getAttribute('data-type');
    
    let icon = '';
    if (type === 'alert') {
        icon = '🔔';
    } else if (type === 'task') {
        icon = '📝';
    } else if (type === 'system') {
        icon = 'ℹ️';
    }
    
    // 使用alert简单显示
    alert(`${icon} ${title}\n${time}\n\n${body}\n\n消息已标记为已读`);
}

/**
 * 筛选消息
 */
function filterMessages() {
    const typeFilter = document.getElementById('message-type-filter').value;
    const timeFilter = document.getElementById('message-time-filter').value;
    
    const messageItems = document.querySelectorAll('.message-item');
    
    // 应用筛选逻辑
    messageItems.forEach(item => {
        const messageType = item.getAttribute('data-type');
        
        // 类型筛选
        let showByType = typeFilter === 'all' || messageType === typeFilter;
        
        // 在实际应用中，这里应该根据时间进行筛选
        // 此处简化处理，仅根据类型筛选
        
        // 设置显示或隐藏
        if (showByType) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // 显示筛选结果提示
    alert(`已筛选: 类型(${typeFilter}), 时间范围(${timeFilter})`);
}

/**
 * 初始化消息通知功能
 */
function initNotification() {
    const notificationIcon = document.querySelector('.notification');
    if (notificationIcon) {
        // 添加消息数量指示器
        updateNotificationBadge();
        
        // 添加点击事件，点击通知图标跳转到消息中心
        notificationIcon.addEventListener('click', () => {
            // 移除当前激活状态
            document.querySelector('.nav-menu li.active').classList.remove('active');
            
            // 设置消息中心菜单为激活项
            const messageNavItem = document.querySelector('.nav-menu li[data-page="message"]');
            messageNavItem.classList.add('active');
            
            // 更新页面标题
            const pageTitle = document.querySelector('.page-title');
            pageTitle.textContent = messageNavItem.textContent.trim();
            
            // 隐藏当前页面
            document.querySelector('.page-content.active').classList.remove('active');
            
            // 显示消息中心页面
            document.getElementById('message-page').classList.add('active');
        });
    }
}

/**
 * 更新通知徽章，显示未读消息数量
 */
function updateNotificationBadge() {
    const notificationIcon = document.querySelector('.notification');
    if (notificationIcon) {
        // 获取未读消息数量 (在实际应用中，这个数据应该从后端获取)
        const unreadCount = document.querySelectorAll('.message-item.unread').length;
        
        // 如果有未读消息，添加徽章
        if (unreadCount > 0) {
            // 清除现有徽章
            const existingBadge = notificationIcon.querySelector('.notification-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // 创建新徽章
            const badge = document.createElement('span');
            badge.className = 'notification-badge';
            badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            
            // 添加徽章到通知图标
            notificationIcon.appendChild(badge);
        } else {
            // 如果没有未读消息，移除徽章
            const existingBadge = notificationIcon.querySelector('.notification-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
        }
    }
}

/**
 * 绘制场地统计图表
 * @param {string} canvasId - Canvas元素ID
 * @param {Object} data - 图表数据
 */
function drawPremiseStatsChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // 创建数据集
    const barDataset = {
        label: '数值',
        data: data.values,
        backgroundColor: data.colors,
        borderColor: data.colors.map(color => color.replace('0.7', '1')),
        borderWidth: 1
    };
    
    // 创建图表
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [barDataset]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            // 根据不同的指标添加不同的单位
                            if (context.dataIndex === 0) {
                                return label + ': ' + value + ' 个';
                            } else {
                                return label + ': ' + value + ' 万元';
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            }
        }
    });
}

/**
 * 初始化场地表格中的按钮事件
 */
function initPremiseTableButtons() {
    // 租赁场地新增按钮
    const rentalAddButton = document.querySelector('.rental-premises .add-button');
    if (rentalAddButton) {
        rentalAddButton.addEventListener('click', function() {
            alert('新增租赁场地功能即将上线');
        });
    }
    
    // 自购场地新增按钮
    const purchaseAddButton = document.querySelector('.purchased-premises .add-button');
    if (purchaseAddButton) {
        purchaseAddButton.addEventListener('click', function() {
            alert('新增自购场地功能即将上线');
        });
    }
    
    // 编辑按钮
    const editButtons = document.querySelectorAll('.premise-info-content .edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('编辑场地信息功能即将上线');
        });
    });
}

/**
 * 加载营销管理页面内容
 */
function loadMarketingPage() {
    const page = document.getElementById('marketing-page');
    
    page.innerHTML = `
        <div class="marketing-management">
            <div class="marketing-header">
                <div class="marketing-title">营销管理</div>
            </div>
            
            <div class="marketing-category-tabs">
                <div class="category-tab active">营销活动</div>
                <div class="category-tab">用户管理</div>
                <div class="category-tab">转化分析</div>
                <div class="category-tab">ROI统计</div>
            </div>
            
            <!-- 标签内容容器 -->
            <div class="marketing-tab-contents">
                <!-- 营销活动标签内容 -->
                <div class="marketing-tab-content active" id="marketing-campaign-content">
                    <!-- 搜索框移动到这里 -->
                    <div class="marketing-search">
                        <input type="text" class="search-input" placeholder="搜索营销活动、渠道...">
                        <button class="search-button">搜索</button>
                        <button class="add-marketing-button">+ 新增营销</button>
                    </div>
                    
                    <!-- 视图切换按钮被隐藏 -->
                    <!-- <div class="marketing-view-toggle">
                        <button class="view-toggle-btn active" data-view="table">表格视图</button>
                        <button class="view-toggle-btn" data-view="card">卡片视图</button>
                    </div> -->
                    
                    <div class="marketing-overview">
                        <div class="marketing-overview-card">
                            <div class="card-title">活动总览</div>
                            <div class="card-value">12</div>
                            <div class="card-label">进行中活动</div>
                        </div>
                        <div class="marketing-overview-card">
                            <div class="card-title">渠道总览</div>
                            <div class="card-value">8</div>
                            <div class="card-label">活跃渠道</div>
                        </div>
                        <div class="marketing-overview-card">
                            <div class="card-title">客户触达</div>
                            <div class="card-value">3,587</div>
                            <div class="card-label">本月触达客户</div>
                        </div>
                        <div class="marketing-overview-card">
                            <div class="card-title">转化率</div>
                            <div class="card-value">18.7%</div>
                            <div class="card-label">平均转化率</div>
                        </div>
                    </div>
                    
                    <div class="marketing-charts-container">
                        <div class="marketing-chart-card">
                            <h3>营销渠道效果分析</h3>
                            <div class="chart-container">
                                <canvas id="marketingChannelChart"></canvas>
                            </div>
                        </div>
                        <div class="marketing-chart-card">
                            <h3>活动转化漏斗</h3>
                            <div class="chart-container">
                                <canvas id="marketingFunnelChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="marketing-table-container">
                        <h3>营销活动列表</h3>
                        <table class="marketing-table">
                            <thead>
                                <tr>
                                    <th>活动名称</th>
                                    <th>渠道</th>
                                    <th>开始日期</th>
                                    <th>结束日期</th>
                                    <th>预算(元)</th>
                                    <th>触达客户</th>
                                    <th>转化客户</th>
                                    <th>转化率</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>618贷款促销</td>
                                    <td>微信公众号</td>
                                    <td>2023-06-01</td>
                                    <td>2023-06-20</td>
                                    <td>20,000</td>
                                    <td>1,256</td>
                                    <td>231</td>
                                    <td>18.4%</td>
                                    <td>
                                        <button class="action-btn view-btn">查看</button>
                                        <button class="action-btn edit-btn">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>新客体验金</td>
                                    <td>App推送</td>
                                    <td>2023-05-15</td>
                                    <td>2023-07-15</td>
                                    <td>50,000</td>
                                    <td>3,782</td>
                                    <td>892</td>
                                    <td>23.6%</td>
                                    <td>
                                        <button class="action-btn view-btn">查看</button>
                                        <button class="action-btn edit-btn">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>老客户回馈</td>
                                    <td>短信</td>
                                    <td>2023-07-01</td>
                                    <td>2023-07-31</td>
                                    <td>15,000</td>
                                    <td>2,103</td>
                                    <td>356</td>
                                    <td>16.9%</td>
                                    <td>
                                        <button class="action-btn view-btn">查看</button>
                                        <button class="action-btn edit-btn">编辑</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-pagination">
                            <button class="pagination-btn">上一页</button>
                            <div class="pagination-info">第 1 页 / 共 3 页</div>
                            <button class="pagination-btn">下一页</button>
                        </div>
                    </div>
                </div>
                
                <!-- 渠道管理标签内容 -->
                <div class="marketing-tab-content" id="marketing-channel-content">
                    <div class="empty-content-placeholder">
                        <div class="placeholder-icon">📈</div>
                        <div class="placeholder-text">用户管理内容正在开发中...</div>
                    </div>
                </div>
                
                <!-- 转化分析标签内容 -->
                <div class="marketing-tab-content" id="marketing-conversion-content">
                    <div class="empty-content-placeholder">
                        <div class="placeholder-icon">📊</div>
                        <div class="placeholder-text">转化分析内容正在开发中...</div>
                    </div>
                </div>
                
                <!-- ROI统计标签内容 -->
                <div class="marketing-tab-content" id="marketing-roi-content">
                    <div class="empty-content-placeholder">
                        <div class="placeholder-icon">💰</div>
                        <div class="placeholder-text">ROI统计内容正在开发中...</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 初始化营销管理页面的图表
    initMarketingCharts();
    
    // 初始化标签切换
    const categoryTabs = page.querySelectorAll('.category-tab');
    categoryTabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // 移除当前激活状态
            page.querySelector('.category-tab.active').classList.remove('active');
            this.classList.add('active');
            
            // 切换内容显示
            const tabContents = page.querySelectorAll('.marketing-tab-content');
            page.querySelector('.marketing-tab-content.active').classList.remove('active');
            tabContents[index].classList.add('active');
        });
    });
    
    // 由于视图切换按钮已被隐藏，下面这段代码可以不执行
    // const viewButtons = page.querySelectorAll('.view-toggle-btn');
    // viewButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         page.querySelector('.view-toggle-btn.active').classList.remove('active');
    //         this.classList.add('active');
    //     });
    // });
    
    // 绑定新增营销按钮事件
    const addMarketingButton = page.querySelector('.add-marketing-button');
    addMarketingButton.addEventListener('click', function() {
        openAddMarketingModal();
    });
    
    // 初始化操作按钮
    const actionViewButtons = page.querySelectorAll('.view-btn');
    actionViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 在实际应用中，这里可以打开活动详情查看
            alert('查看活动详情');
        });
    });
    
    const editButtons = page.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 在实际应用中，这里可以打开活动编辑
            alert('编辑活动信息');
        });
    });
}

/**
 * 打开新增营销活动模态框
 */
function openAddMarketingModal() {
    const modal = document.getElementById('addMarketingModal');
    
    // 加载模态框内容
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = createAddMarketingContent();
    
    // 显示模态框
    openModal(modal);
    
    // 绑定表单提交事件
    const form = modal.querySelector('.marketing-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // 在实际应用中，这里会处理表单数据提交
        alert('营销活动创建成功！');
        closeModal(modal);
    });
    
    // 绑定取消按钮事件
    const cancelButton = modal.querySelector('.cancel-button');
    cancelButton.addEventListener('click', function() {
        closeModal(modal);
    });
}

/**
 * 创建新增营销活动表单内容
 * @returns {string} 表单的HTML字符串
 */
function createAddMarketingContent() {
    return `
        <form class="marketing-form">
            <div class="form-group">
                <label class="form-label">活动名称</label>
                <input type="text" class="form-input" placeholder="请输入活动名称" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">营销渠道</label>
                <select class="form-select" required>
                    <option value="">请选择营销渠道</option>
                    <option value="wechat">微信公众号</option>
                    <option value="app">App推送</option>
                    <option value="sms">短信</option>
                    <option value="call">电话营销</option>
                    <option value="offline">线下活动</option>
                    <option value="social">社交媒体</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">开始日期</label>
                <input type="date" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">结束日期</label>
                <input type="date" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">预算(元)</label>
                <input type="number" class="form-input" placeholder="请输入预算金额" min="0" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">目标客户群体</label>
                <select class="form-select" required>
                    <option value="">请选择目标客户群体</option>
                    <option value="all">所有客户</option>
                    <option value="vip">VIP客户</option>
                    <option value="new">新客户</option>
                    <option value="inactive">不活跃客户</option>
                    <option value="risk">风险客户</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">活动描述</label>
                <textarea class="form-textarea" placeholder="请输入活动描述" rows="4"></textarea>
            </div>
            
            <div class="form-buttons">
                <button type="button" class="cancel-button">取消</button>
                <button type="submit" class="submit-button">创建活动</button>
            </div>
        </form>
    `;
}

/**
 * 初始化菜单切换功能
 */
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    // 默认隐藏按钮
    menuToggle.style.display = 'none';
    
    // 检查屏幕宽度
    function checkScreenWidth() {
        if (window.innerWidth <= 992) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            // 确保大屏幕下侧边栏可见
            sidebar.classList.remove('mobile-visible');
        }
    }
    
    // 初始检查
    checkScreenWidth();
    
    // 窗口大小变化时重新检查
    window.addEventListener('resize', checkScreenWidth);
    
    // 点击切换菜单
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('mobile-visible');
    });
    
    // 点击内容区域时隐藏侧边栏（移动视图下）
    document.querySelector('.main-content').addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && sidebar.classList.contains('mobile-visible') && !e.target.closest('.menu-toggle')) {
            sidebar.classList.remove('mobile-visible');
        }
    });
}

