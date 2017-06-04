
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chatuser`
-- ----------------------------
DROP TABLE IF EXISTS `chatuser`;
CREATE TABLE `chatuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `login_time` datetime DEFAULT NULL,
  `login_ip` varchar(50) NOT NULL DEFAULT '127.0.0.1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chatuser
-- ----------------------------
INSERT INTO `chatuser` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '195745927@qq.com', '15997441397', '2015-08-03 17:59:47', '2015-08-04 14:37:05', '127.0.0.1');
INSERT INTO `chatuser` VALUES ('2', 'ScumVirus', 'fd292ba3003f491a431e8a9b73436896', 'scumvirus@qq.com', '15997441397', '2015-08-03 18:07:28', '2015-08-04 14:36:40', '127.0.0.1');
INSERT INTO `chatuser` VALUES ('3', 'test', 'e10adc3949ba59abbe56e057f20f883e', 'openAccount@163.com', '13871451558', '2015-08-03 18:09:06', null, '127.0.0.1');
INSERT INTO `chatuser` VALUES ('4', 'test2', 'e10adc3949ba59abbe56e057f20f883e', 'openAccount@163.com', '13871451558', '2015-08-03 18:18:33', null, '127.0.0.1');
INSERT INTO `chatuser` VALUES ('5', 'test3', 'e10adc3949ba59abbe56e057f20f883e', 'openAccount@163.com', '13871451558', '2015-08-03 18:20:56', null, '127.0.0.1');
