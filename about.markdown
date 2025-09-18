---
layout: page
title: About
permalink: /about/
excerpt: Academic web page
does_not_need_title: true
---
<h1 style="margin:0px; font-size: 36px">About</h1>

- Currently, I am a post-doctoral fellow at the <a href="https://www.uchicago.edu/">University of Chicago</a> and <a href="https://www.anl.gov/">Argonne Nationnal Lab</a>. 
I am part of <a href="https://labs.globus.org/">Globus Labs</a> and work with the supervision of <a href="https://www.anl.gov/profile/ian-t-foster">Ian Foster</a> and <a href="https://cs.uchicago.edu/people/kyle-chard/">Kyle Chard</a>.

working on **Efficient Training of Neural Networks**, previously I was at Skoltech with laboratories of <a href="https://scholar.google.com/citations?user=5kMqBQEAAAAJ&hl=en"> Prof. Ivan Oseledets</a> and <a href="https://scholar.google.com/citations?user=wpZDx1cAAAAJ&hl=en">Prof. Andrzej Cichocki</a>.

- I received my <a href="https://theses.hal.science/tel-04260094/file/GONTHIER_Maxime_2023ENSL0061.pdf">PhD</a> at <a href="http://www.ens-lyon.fr/">ENS Lyon</a> in 2023. I worked in the <a href="http://www.ens-lyon.fr/LIP/ROMA/">ROMA team</a> at the LIP laboratory under the supervision of <a href="http://perso.ens-lyon.fr/loris.marchal/" label="Loris MARCHAL website">Loris Marchal</a> (ENS Lyon, CNRS) and in the <a href="https://www.inria.fr/fr/storm">STORM team</a> at <a href="https://www.inria.fr/fr/centre-inria-universite-bordeaux">INRIA Bordeaux</a> under the supervision of <a href="https://dept-info.labri.fr/~thibault/" label="link to the Samuel THIBAULT's website"> Samuel Thibault</a> (Université de Bordeaux, Inria).</p>


- I received my <a href="http://mech.math.msu.su/~snark/files/diss/0169diss.pdf">Ph.D. in Probability Theory and Statistics</a> and Master's in Mathematics from <a href="http://new.math.msu.su/department/probab/os/index-e.html">Lomonosov Moscow State University</a>, and in parallel, I completed a Master's-level program in Computer Science and Data Analysis from the <a href="https://yandexdataschool.com/">Yandex School of data analysis</a>.

- My previous research deals with **Compression and Inference Speed-up** of computer vision models (classification/object detection/segmentation), Neural Ordinary Differential Equations (**Neural ODEs**), as well as neural networks analysis using low-rank methods, such as tensor decompositions and active subspaces.  Also, I had some audio-related activity,  particularly, I participated in the project on speech synthesis and voice conversion. Some of my earlier projects were related to medical data processing (EEG, ECG)  and included human disease detection, artifact removal, and weariness detection.

- Research interests: Scheduling, Data Locality, GPUs, Energy/Carbon-Aware Scheduling, HPC Users Incentives, Erasure Coding, Parallel Algortihms, Deadline-Aware Scheduling.


<br/>
<div class="scaleIcons">
<center>
    <a class="hovernounderline" href="https://drive.google.com/file/d/1c_rME4F4KUaMSAJVkIJgJdcakJm8H1KM/view?usp=sharing">
        <i class="svg-icon cv"></i>
    </a>
    <a class="hovernounderline" href="https://github.com/{{ site.footer-links.github }}">
        <i class="svg-icon github"></i>
    </a>
    <a class="hovernounderline" href="https://scholar.google.com/citations?hl=en&user={{ site.footer-links.googlescholar }}">
        <i class="svg-icon googlescholar"></i>
    </a>
    <a class="hovernounderline" href="https://www.linkedin.com/in/{{ site.footer-links.linkedin }}">
        <i class="svg-icon linkedin"></i>
    </a>
    <a class="hovernounderline" href="https://www.twitter.com/{{ site.footer-links.twitter }}">
        <i class="svg-icon twitter"></i>
    </a>
</center>
</div>

<h1 style="font-size: 36px">Selected publications</h1>

<h2 style="font-size: 32px; text-align: center">Efficient Training of Neural Networks</h2>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/survey.png" alt="" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Survey on Efficient Training of Large Neural Networks</p>
        <p class="authors">J. Gusak, D. Cherniuk, A. Shilova, A. Katrutsa, D. Bershatsky, X. Zhao, L. Eyraud-Dubois, O. Shliazhko, D. Dimitrov, I. Oseledets, O. Beaumont</p>
        <p class="conf">IJCAI-ECAI 2022</p>
        <p class="description">
            Modern Deep Neural Networks (DNNs) require significant memory to store weight, activations, and other intermediate tensors during training. Hence, many models don’t fit one GPU device or can be trained using only a small per-GPU batch size. This survey provides a systematic overview of the ap- proaches that enable more efficient DNNs training. We analyze techniques that save memory and make good use of computation and communication re- sources on architectures with a single or several GPUs. We summarize the main categories of strate- gies and compare strategies within and across cate- gories. Along with approaches proposed in the lit- erature, we discuss available implementations.
        </p>
        <div class="links">
            <a href="https://www.ijcai.org/proceedings/2022/0769.pdf">Paper</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/hiremate.png" alt="" style="max-width: 100%; height: auto; width: 80%; display: block; margin: 0 auto;" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">HiRemate: Hierarchical Approach for Efficient Re-materialization of Neural Networks</p>
        <p class="authors">J. Gusak, X. Zhao, T.L. Hellard, Z. Li, L. Eyraud-Dubois, O. Beaumont</p>
        <p class="conf">ICML 2025</p>
        <p class="description">
            Training deep neural networks (DNNs) on memory-limited GPUs is challenging, as storing intermediate activations often exceeds available memory. Re-materialization, a technique that preserves exact computations, addresses this by selectively recomputing activations instead of storing them. However, existing methods either fail to scale, lack generality, or introduce excessive execution overhead. We introduce HiRemate a hierarchical re-materialization framework that recursively partitions large computation graphs, applies optimized solvers at multiple levels, and merges solutions into a global efficient training schedule. This enables scalability to significantly larger graphs than prior ILP-based methods while keeping runtime overhead low. Designed for single-GPU models and activation re-materialization, HiRemate extends the feasibility of training networks with thousands of graph nodes, surpassing prior methods in both efficiency and scalability. Experiments on various types of networks yield up to 50-70% memory reduction with only 10-15% overhead, closely matching optimal solutions while significantly reducing solver time.
        </p>
        <div class="links">
            <a href="https://openreview.net/pdf?id=rnx11J4hsg">Paper</a>
        </div>
    </div>
</div>

<!-- <div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/rockmate.png" alt="" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Rockmate: an Efficient, Fast, Automatic and Generic Tool for Re-materialization in PyTorch</p>
        <p class="authors">X. Zhao, T.L. Hellard, L. Eyraud-Dubois, J. Gusak, O. Beaumont</p>
        <p class="conf">ICML 2023</p>
        <p class="description">
            We propose Rockmate to control the memory requirements when training PyTorch DNN models. Rockmate is an automatic tool that starts from the model code and generates an equivalent model, using a predefined amount of memory for activations, at the cost of a few re-computations. Rockmate automatically detects the structure of computational and data dependencies and rewrites the initial model as a sequence of complex blocks. We show that such a structure is widespread and can be found in many models in the literature (Transformer based models, ResNet, RegNets,...). This structure allows us to solve the problem in a fast and efficient way, using an adaptation of Checkmate (too slow on the whole model but general) at the level of individual blocks and an adaptation of Rotor (fast but limited to sequential models) at the level of the sequence itself. We show through experiments on many models that Rockmate is as fast as Rotor and as efficient as Checkmate, and that it allows in many cases to obtain a significantly lower memory consumption for activations (by a factor of 2 to 5) for a rather negligible overhead (of the order of 10% to 20%). Rockmate is open source and available at https://github.com/topal-team/rockmate.
        </p>
        <div class="links">
            <a href="https://openreview.net/pdf?id=wLAMOoL0KD">Paper</a>
        </div>
    </div>
</div> -->

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/fewbit.png" alt="" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Few-bit backward: Quantized gradients of activation functions for memory footprint reduction</p>
        <p class="authors">G. Novikov, D. Bershatsky, J. Gusak, A. Shonenkov, D. Dimitrov, I. Oseledets</p>
        <p class="conf">ICML 2023</p>
        <p class="description">
            Memory footprint is one of the main limiting factors for large neural network training. In backpropagation, one needs to store the input to each operation in the computational graph. Every modern neural network model has quite a few pointwise nonlinearities in its architecture, and such operations induce additional memory costs that, as we show, can be significantly reduced by quantization of the gradients. We propose a systematic approach to compute optimal quantization of the retained gradients of the pointwise nonlinear functions with only a few bits per each element. We show that such approximation can be achieved by computing an optimal piecewise-constant approximation of the derivative of the activation function, which can be done by dynamic programming. The drop-in replacements are implemented for all popular nonlinearities and can be used in any existing pipeline. We confirm the memory reduction and the same convergence on several open benchmarks.
        </p>
        <div class="links">
            <a href="https://proceedings.mlr.press/v202/novikov23a/novikov23a.pdf">Paper</a>
        </div>
    </div>
</div>



<h2 style="font-size: 32px; text-align: center">Inference Speed-up and Compression of Neural Networks</h2>

<!-- <> -->
<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/qcpd-epc.png" alt="" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Quantization Aware Factorization for Deep Neural Network Compression</p>
        <p class="authors">D. Cherniuk, S. Abukhovich, A.H. Phan, I. Oseledets, A. Cichocki, J. Gusak</p>
        <p class="conf">Journal of Artificial Intelligence Research, 2024</p>
        <p class="description">
            Tensor decomposition of convolutional and fully-connected layers is an effective way to reduce parameters and FLOP in neural networks. Due to memory and power consumption limitations of mobile or embedded devices, the quantization step is usually necessary when pre-trained models are deployed. A conventional post-training quantization approach applied to networks with decomposed weights yields a drop in accuracy. This motivated us to develop an algorithm that finds tensor approximation directly with quantized factors and thus benefit from both compression techniques while keeping the prediction quality of the model. Namely, we propose to use Alternating Direction Method of Multipliers (ADMM) for Canonical Polyadic (CP) decomposition with factors whose elements lie on a specified quantization grid. We compress neural network weights with a devised algorithm and evaluate it's prediction quality and performance. We compare our approach to state-of-the-art post-training quantization methods and demonstrate competitive results and high flexibility in achiving a desirable quality-performance tradeoff.
        </p>
        <div class="links">
            <a href="https://arxiv.org/pdf/2308.04595.pdf">Paper</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/cpd-epc.png" alt="" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Stable Low-rank Tensor Decomposition for Compression of Convolutional Neural Network</p>
        <p class="authors">A.H. Phan, K. Sobolev, K. Sozykin, D. Ermilov, J. Gusak, P. Tichavsky, V. Glukhov, I. Oseledets, A. Cichocki</p>
        <p class="conf">ECCV 2020</p>
        <p class="description">
            Most state of the art deep neural networks are overparameterized and exhibit a high computational cost. A straightforward approach to this problem is to replace convolutional kernels with its low-rank tensor approximations, whereas the Canonical Polyadic tensor Decomposition is one of the most suited models. However, fitting the convolutional tensors by numerical optimization algorithms often encounters diverging components, i.e., extremely large rank-one tensors but canceling each other. Such degeneracy often causes the non-interpretable result and numerical instability for the neural network fine-tuning. This paper is the first study on degeneracy in the tensor decomposition of convolutional kernels. We present a novel method, which can stabilize the low-rank approximation of convolutional kernels and ensure efficient compression while preserving the high-quality performance of the neural networks. We evaluate our approach on popular CNN architectures for image classification and show that our method results in much lower accuracy degradation and provides consistent performance.
        </p>
        <div class="links">
            <a href="https://arxiv.org/pdf/2008.05441.pdf">Paper</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/musco.png" alt=""/>
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Automated Multi-Stage Compression of Neural Networks</p>
        <p class="authors"> <b>J. Gusak, M. Kholiavchenko</b>, E. Ponomarev, L. Markeeva, A. Cichocki, I. Oseledets</p>
        <p class="conf">ICCV 2019 Workshop on Low-Power Computer Vision</p>
        <p class="description">
            We propose a new simple and efficient iterative approach for compression of deep neural networks, which alternates low-rank factorization with smart rank selection and fine-tuning. We demonstrate the efficiency of our method comparing to non-iterative ones. Our approach improves the compression rate while maintaining the accuracy for a variety of computer vision tasks.
        </p>
        <div class="links">
            <a href="http://openaccess.thecvf.com/content_ICCVW_2019/papers/LPCV/Gusak_Automated_Multi-Stage_Compression_of_Neural_Networks_ICCVW_2019_paper.pdf">Paper</a>
            <a href="https://rebootingcomputing.ieee.org/images/files/pdf/iccv-2019_julia-gusak.pdf">Presentation</a>
            <a href="https://github.com/musco-ai/musco-pytorch/tree/develop">Code-PyTorch</a>
            <a href="https://github.com/musco-ai/musco-tf">Code-TensorFlow</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/ron.png" alt=""/>
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Reduced-Order Modeling of Deep Neural Networks</p>
        <p class="authors"><b>J. Gusak, T. Daulbaev</b> E. Ponomarev, A. Cichocki, I. Oseledets</p>
        <p class="conf">Computational Mathematics and Mathematical Physics Journal, 2021</p>
        <p class="description">
            We introduce a new method for speeding up the inference of deep neural networks. It is somewhat inspired by the reduced-order modeling techniques for dynamical systems. The cornerstone of the proposed method is the maximum volume algorithm. We demonstrate efficiency on VGG and ResNet architectures pre-trained on different datasets. We show that in many practical cases it is possible to replace convolutional layers with much smaller fully-connected layers with a relatively small drop in accuracy.
        </p>
        <div class="links">
            <a href="https://arxiv.org/pdf/1910.06995">Paper</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/asnet.png" alt=""/>
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Active Subspace of Neural Networks: Structural Analysis and Universal Attacks</p>
        <p class="authors"> C. Cui, K. Zhang, T. Daulbaev, J. Gusak, I. Oseledets, Z. Zhang</p>
        <p class="conf"> SIAM Journal on Mathematics of Data Science (SIMODS), 2020</p>
        <p class="description">
            Active subspace is a model reduction method widely used in the uncertainty quantification community. Firstly, we employ the active subspace to measure the number of" active neurons" at each intermediate layer and reduce the number of neurons from several thousands to several dozens, yielding to a new compact network. Secondly, we propose analyzing the vulnerability of a neural network using active subspace and finding an additive universal adversarial attack vector that can misclassify a dataset with a high probability.
        </p>
        <div class="links">
            <a href="https://arxiv.org/pdf/1910.13025.pdf">Paper</a>
            <a href="https://github.com/chunfengc/ASNet">Code</a>
        </div>
    </div>
</div>

<h2 style="font-size: 32px; text-align: center">Neural Ordinary Differential Equations (Neural ODEs)</h2>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/neural-ode-norm.png" alt=""/>
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Towards Understanding Normalization in Neural ODEs</p>
        <p class="authors"> <b>J. Gusak</b>, L. Markeeva, T. Daulbaev, A. Katrutsa, A. Cichocki, I. Oseledets</p>
        <p class="conf">ICLR 2020 DeepDiffeq workshop</p>
        <p class="description">
            Normalization is an important and vastly investigated technique in deep learning. However, its role for Ordinary Differential Equation based networks (neural ODEs) is still poorly understood. This paper investigates how different normalization techniques affect the performance of neural ODEs. Particularly, we show that it is possible to achieve 93% accuracy in the CIFAR-10 classification task, and to the best of our knowledge, this is the highest reported accuracy among neural ODEs tested on this problem.
        </p>
        <div class="links">
            <a href="https://openreview.net/forum?id=mllQ3QNNr9d">Paper</a>
            <a href="https://drive.google.com/file/d/1rbpudtm01WfpYPJaew-OmTK1BaDwQE0p/view?usp=sharing">Presentation</a>
            <a href="https://github.com/juliagusak/neural-ode-norm">Code</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/iam.png" alt=""/>
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Interpolation technique to speed up gradients propagation in neural ordinary differential equations</p>
        <p class="authors"> T. Daulbaev, A. Katrutsa, L. Markeeva, J. Gusak, A. Cichocki, I. Oseledets</p>
        <p class="conf">NeurIPS 2020</p>
        <p class="description"> We propose a simple interpolation-based method for the efficient approximation of gradients in neural ODE models. We compare it with reverse dynamic method (known in literature as ''adjoint method'') to train neural ODEs on classification, density estimation and inference approximation tasks. We also propose a theoretical justification of our approach using logarithmic norm formalism. As a result, our method allows  faster model training than reverse dynamic method on several standard benchmarks.
        </p>
        <div class="links">
            <a href="https://arxiv.org/abs/2003.05271">Paper</a>
        </div>
    </div>
</div>



<br/>
<h1 style="font-size: 36px">Selected projects</h1>
<!-- < -->
<!-- <div id="projects"> -->
<div class="row projects">
    <div class="col col-sm-3 vcenter imgcol marginbottom">
        <img class="img-responsive proj-img" src="/assets/about/metasolver.png" alt=""/>
    </div>
    <div class="col col-sm-9 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">MetaSolver</p>
        <p class="description">
        A Python library that supports neural ODEs with MetaODE blocks: propagation through them is performed using sampling or ensembling of ODE solvers rather than a pre-defined one.
        </p>
        <div class="links">
            <a href="https://github.com/juliagusak/neural-ode-metasolver">Code</a>
        </div>
    </div>
</div>

<div class="row projects">
    <div class="col col-sm-3 vcenter imgcol marginbottom">
        <img class="img-responsive proj-img" src="/assets/about/musco2.png" alt=""/>
    </div>
    <div class="col col-sm-9 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">MUSCO: MUlti-Stage COmpression of neural networks</p>
        <p class="description">
        A Python library for convenient neural network compression based on tensor approximations. It supports both automated and manual compression schemes.
        </p>
        <div class="links">
            <a href="https://github.com/musco-ai/musco-pytorch/tree/develop">Code</a>
        </div>
    </div>
</div>

<div class="row projects">
    <div class="col col-sm-3 vcenter imgcol marginbottom">
        <img class="img-responsive proj-img" src="/assets/about/flopco.jpg" alt=""/>
    </div>
    <div class="col col-sm-9 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">FlopCo: FLOP and other statistics COunter for Pytorch neural networks</p>
        <p class="description">
        A Python library FlopCo has been created to make FLOP and MAC counting simple and accessible for  Pytorch  neural networks. Moreover, FlopCo allows to collect other useful model statistics, such as number of parameters, shapes of layer inputs/outputs, etc.
        </p>
        <div class="links">
            <a href="https://github.com/juliagusak/flopco-pytorch">Code</a>
        </div>
    </div>
</div>

<div class="row projects">
    <div class="col col-sm-3 vcenter imgcol marginbottom">
        <img class="img-responsive proj-img" src="/assets/about/dataloaders.jpg" alt=""/>
    </div>
    <div class="col col-sm-9 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Data loaders for speech and audio data sets</p>
        <p class="description">
        A Python library with PyTorch and TFRecords data loaders for convenient preprocessing of popular speech, music and environmental sound data sets.
        </p>
        <div class="links">
            <a href="https://github.com/juliagusak/dataloaders">Code</a>
        </div>
    </div>
</div>

<div class="row projects">
    <div class="col col-sm-3 vcenter imgcol marginbottom">
        <img class="img-responsive proj-img" src="/assets/about/audio_classification.jpg" alt=""/>
    </div>
    <div class="col col-sm-9 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Speaker identification using neural network models</p>
        <p class="description">
        In the framework of this project a <a href="https://arxiv.org/abs/1704.01279">WaveNet-style autoencoder</a> model for audio synthesis and a <a href="https://arxiv.org/abs/1711.10282">neural network</a> for environment sounds classification have been adopted to solve speaker identification task. 
        </p>
        <div class="links">
            <a href="https://github.com/juliagusak/audio_classification">Code</a>
        </div>
    </div>
</div>

<div class="row projects">
    <div class="col col-sm-3 vcenter imgcol marginbottom">
        <img class="img-responsive proj-img" src="/assets/about/scatnet.png" alt=""/>
    </div>
    <div class="col col-sm-9 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Scattering transform</p>
        <p class="description">
         Python implementation of the scattering transform from MATLAB toolbox <a href="https://www.di.ens.fr/data/software/scatnet">ScatNet</a>. 
        </p>
        <div class="links">
            <a href="https://github.com/juliagusak/scatnet_python">Code</a>
        </div>
    </div>
</div>

<div class="row projects">
    <div class="col col-sm-3 vcenter imgcol marginbottom">
        <img class="img-responsive proj-img" src="/assets/about/ftrl-proximal.png" alt=""/>
    </div>
    <div class="col col-sm-9 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Per-Coordinate FTRL-Proximal with L1 and L2 Regularization for Logistic Regression</p>
        <p class="description">
         C++ implementation of the online optimization algorithm for logistic regression training, described in the following <a href="http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41159.pdf">paper.</a> 
        </p>
        <div class="links">
            <a href="https://github.com/juliagusak/ftrl-proximal">Code</a>
        </div>
    </div>
</div>

