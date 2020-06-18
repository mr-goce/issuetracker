const express = require('express');
const router = express.Router();
const routeAuthorization = require('../routeAuthorization');
const User = require('../models/User');
const Issue = require('../models/Issue');
const { validateName } = require('../validation')

// Private Route
router.get('/', routeAuthorization, async (req, res) => {
    try {
        const issues = await Issue.find({ user: req.user.id });
        res.json(issues)
    } catch (error) {
        res.status(500).send('Server Issue ...')
    }
})

router.post('/',  routeAuthorization, async (req, res) => {
    // res.send('Create new issue')
    const { name, description, status, type } = req.body;

    try {
        newIssue = new Issue({
            name,
            description,
            status,
            type,
            user: req.user.id

        })
        const issue = await newIssue.save();
        res.send(issue);
    } catch (error) {
        res.status(500).send('Server Issue ...')
    }
})

router.put('/:id', routeAuthorization, async (req, res) => {
    const { name, description, status, type } = req.body;
    const issueFields = {};
    if (name) issueFields.name = name;
    if (description) issueFields.description = description;
    if (status) issueFields.status = status;
    if (type) issueFields.type = type;

    try {
        let issue = await Issue.findById(req.params.id);
        if (!issue) return res.status(404).send(`Issue dont exist!!!`);
        //make sure user owns the issues
        if (issue.user.toString() !== req.user.id) {
            return res.status(401).send(` Not authorized`)
        }
        issue = await Issue.findByIdAndUpdate(req.params.id, { $set: issueFields }, { new: true });
        res.json(issue);
    } catch (error) {
        res.send(error.message).status(500);
    }
})

router.delete('/:id', routeAuthorization, async (req, res) => {

    try {
        let issue = await Issue.findById(req.params.id);
        if (!issue) return res.status(404).send(`Issue dont exist!!!`);
        //make sure user owns the Issue
        if (issue.user.toString() !== req.user.id) {
            return res.status(401).send(` Not authorized`)
        }
        await Issue.findByIdAndRemove(req.params.id)
        res.send(`Issue is removed`)
    } catch (error) {
        res.send(error.message).status(500);
    }


})

module.exports = router
